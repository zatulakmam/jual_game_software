'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama harus terdiri dari minimal 2 karakter.'),
    email: z.string().email('Masukkan alamat email yang valid.'),
    password: z.string().min(8, 'Kata sandi harus terdiri dari minimal 8 karakter.'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi terlebih dahulu.'),
    terms: z.boolean().refine((v) => v === true, 'Kamu harus menyetujui Syarat dan Ketentuan.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak sama.',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function PasswordStrength({ password }: { password: string }) {
  const len = password.length;
  const strength = len === 0 ? 0 : len < 6 ? 1 : len < 8 ? 2 : len < 12 ? 3 : 4;
  const colors = ['#E5E7EB', '#EF4444', '#FF7547', '#F9ED32', '#22C55E'];
  const labels = ['', 'Terlalu pendek', 'Lemah', 'Cukup', 'Kuat'];

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i <= strength ? colors[strength] : '#E5E7EB',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </div>
      {len > 0 && (
        <p style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: colors[strength] }}>
          {labels[strength]}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const passwordValue = watch('password', '');

  const onSubmit = async (data: RegisterForm) => {
    if (!isSupabaseConfigured) {
      toast.error('Registrasi belum tersedia. Konfigurasi Supabase terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    try {
      const { data: authData, error } = await createClient().auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: { name: data.name.trim() },
          emailRedirectTo: new URL(
            '/dashboard',
            process.env.NEXT_PUBLIC_SITE_URL?.trim() || window.location.origin
          ).toString(),
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (authData.session) {
        toast.success('Akun berhasil dibuat.');
        router.replace('/dashboard');
        router.refresh();
        return;
      }

      if (authData.user) {
        toast.success('Akun dibuat. Periksa email Anda untuk konfirmasi sebelum login.');
        return;
      }

      toast.error('Registrasi belum berhasil. Silakan coba lagi.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '11px 14px',
    border: `2px solid ${hasError ? '#EF4444' : '#171717'}`,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'Space Grotesk', sans-serif",
    color: '#171717',
    backgroundColor: '#ffffff',
    outline: 'none',
    boxShadow: hasError ? '3px 3px 0px #EF4444' : '3px 3px 0px #171717',
    boxSizing: 'border-box',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 700,
    color: '#171717',
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F5F0E8',
          display: 'flex',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* LEFT: Decorative Panel */}
        <div
          style={{
            flex: '0 0 50%',
            backgroundColor: '#171717',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="hidden lg:flex"
        >
          <div
            style={{
              position: 'absolute',
              top: -80,
              left: -80,
              width: 320,
              height: 320,
              borderRadius: '50%',
              backgroundColor: '#55E6D1',
              opacity: 0.12,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: '50%',
              backgroundColor: '#F9ED32',
              opacity: 0.12,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: 40,
              width: 160,
              height: 160,
              borderRadius: 24,
              backgroundColor: '#FF7547',
              opacity: 0.1,
              transform: 'rotate(20deg)',
            }}
          />

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                backgroundColor: '#F9ED32',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={26} color="#171717" />
            </div>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
              Sinzo Store
            </span>
          </div>

          {/* Center content */}
          <div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: -2,
              }}
            >
              Gabung di
              <br />
              <span style={{ color: '#55E6D1' }}>Sinzo</span>
              <br />
              Store ⚡
            </h1>
            <p style={{ fontSize: 17, color: '#9CA3AF', fontWeight: 500, lineHeight: 1.6, maxWidth: 380 }}>
              Buat akun untuk mengelola profil dan melihat aktivitasmu di Sinzo Store.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 36 }}>
              {[
                'Jelajahi katalog game dan software',
                'Cek detail serta harga produk',
                'Kelola nama akun dan email',
                'Riwayat transaksi akan tersedia setelah sistem pembayaran aktif',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle2 size={20} color="#55E6D1" />
                  <span style={{ fontSize: 15, color: '#D1D5DB', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decorative stars */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {['★', '☆', '★', '☆', '★', '☆'].map((s, i) => (
              <span key={i} style={{ color: '#F9ED32', fontSize: i % 2 === 0 ? 22 : 14, opacity: i % 2 === 0 ? 1 : 0.5 }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Register Form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            overflowY: 'auto',
          }}
        >
          <div style={{ width: '100%', maxWidth: 440 }}>
            {/* Mobile logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }} className="flex lg:hidden">
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#F9ED32',
                  border: '2px solid #171717',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={22} color="#171717" />
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#171717' }}>Sinzo Store</span>
            </div>

            {/* Form card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '3px solid #171717',
                borderRadius: 16,
                boxShadow: '6px 6px 0px #171717',
                padding: '40px 36px',
              }}
            >
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: '#171717', marginBottom: 6 }}>
                  Buat akun 🚀
                </h2>
                <p style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>
                  Isi data berikut untuk mulai
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Full Name */}
                <div>
                  <label style={labelStyle}>
                    Nama Lengkap <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Budi Santoso"
                    style={inputStyle(!!errors.name)}
                  />
                  {errors.name && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>
                    Alamat Email <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    style={inputStyle(!!errors.email)}
                  />
                  {errors.email && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label style={labelStyle}>
                    Kata Sandi <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimal 8 karakter"
                      style={{ ...inputStyle(!!errors.password), paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <PasswordStrength password={passwordValue} />
                  {errors.password && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={labelStyle}>
                    Konfirmasi Kata Sandi <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      {...register('confirmPassword')}
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Ulangi kata sandi"
                      style={{ ...inputStyle(!!errors.confirmPassword), paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms checkbox */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      {...register('terms')}
                      type="checkbox"
                      style={{
                        width: 18,
                        height: 18,
                        marginTop: 2,
                        cursor: 'pointer',
                        accentColor: '#F9ED32',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#374151', lineHeight: 1.5 }}>
                      Saya menyetujui{' '}
                      <Link href="/terms" style={{ fontWeight: 700, color: '#171717', textDecoration: 'underline' }}>
                        Syarat dan Ketentuan
                      </Link>{' '}
                      dan{' '}
                      <Link href="/privacy" style={{ fontWeight: 700, color: '#171717', textDecoration: 'underline' }}>
                        Kebijakan Privasi
                      </Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '13px',
                    backgroundColor: isLoading ? '#D1D5DB' : '#F9ED32',
                    border: '2px solid #171717',
                    borderRadius: 8,
                    boxShadow: '4px 4px 0px #171717',
                    fontSize: 16,
                    fontWeight: 800,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#171717',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" strokeLinecap="round" />
                      </svg>
                      Membuat akun...
                    </>
                  ) : (
                    'Daftar 🚀'
                  )}
                </button>

                {/* Login link */}
                <p style={{ textAlign: 'center', fontSize: 15, fontWeight: 600, color: '#6B7280' }}>
                  Sudah punya akun?{' '}
                  <Link
                    href="/login"
                    style={{
                      color: '#171717',
                      fontWeight: 800,
                      textDecoration: 'none',
                      borderBottom: '2px solid #F9ED32',
                    }}
                  >
                    Masuk →
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

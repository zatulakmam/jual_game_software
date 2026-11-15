'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, ArrowLeft, ShoppingBag, Send, CheckCircle } from 'lucide-react';

const forgotSchema = z.object({
  email: z.string().email('Masukkan alamat email yang valid.'),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = async (data: ForgotForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmittedEmail(data.email);
    setSubmitted(true);
    toast.success('Permintaan reset kata sandi berhasil dikirim (simulasi).', {
      style: {
        border: '2px solid #171717',
        boxShadow: '4px 4px 0px #171717',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F5F0E8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 40,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              backgroundColor: '#F9ED32',
              border: '2px solid #171717',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0px #171717',
            }}
          >
            <ShoppingBag size={24} color="#171717" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#171717' }}>Sinzo Store</span>
        </Link>

        <div
          style={{
            backgroundColor: '#ffffff',
            border: '3px solid #171717',
            borderRadius: 16,
            boxShadow: '6px 6px 0px #171717',
            padding: '48px 40px',
            width: '100%',
            maxWidth: 460,
          }}
        >
          {!submitted ? (
            <>
              {/* Icon */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: '#F9ED32',
                  border: '3px solid #171717',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  boxShadow: '4px 4px 0px #171717',
                }}
              >
                <Mail size={36} color="#171717" />
              </div>

              <h1 style={{ fontSize: 28, fontWeight: 900, color: '#171717', marginBottom: 8 }}>
                Lupa kata sandi?
              </h1>
              <p style={{ fontSize: 15, color: '#6B7280', fontWeight: 500, marginBottom: 32, lineHeight: 1.6 }}>
                Masukkan alamat email akunmu untuk meminta tautan reset kata sandi.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 6,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#171717',
                    }}
                  >
                    Alamat Email <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      border: `2px solid ${errors.email ? '#EF4444' : '#171717'}`,
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#171717',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                      boxShadow: errors.email ? '3px 3px 0px #EF4444' : '3px 3px 0px #171717',
                      boxSizing: 'border-box',
                    }}
                  />
                  {errors.email && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

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
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Permintaan Reset
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div style={{ textAlign: 'center' }}>
              {/* Success illustration */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: '#55E6D1',
                  border: '3px solid #171717',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                  boxShadow: '5px 5px 0px #171717',
                  animation: 'popIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
                }}
              >
                <style>{`@keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }`}</style>
                <CheckCircle size={52} color="#171717" />
              </div>

              {/* Decorative dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                {['#F9ED32', '#A78BFA', '#55E6D1', '#FF7547'].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: '2px solid #171717',
                    }}
                  />
                ))}
              </div>

              <h2 style={{ fontSize: 26, fontWeight: 900, color: '#171717', marginBottom: 12 }}>
                Cek email kamu! 📬
              </h2>
              <p style={{ fontSize: 15, color: '#6B7280', fontWeight: 500, lineHeight: 1.6, marginBottom: 8 }}>
                Permintaan reset kata sandi (simulasi) untuk:
              </p>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F5F0E8',
                  border: '2px solid #171717',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#171717',
                  marginBottom: 24,
                }}
              >
                {submittedEmail}
              </div>
              <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500, marginBottom: 32 }}>
                Belum menerima email? Cek folder spam atau{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#171717',
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  coba lagi
                </button>
              </p>
            </div>
          )}

          {/* Back to login */}
          <div style={{ marginTop: submitted ? 0 : 24, textAlign: 'center' }}>
            <Link
              href="/auth/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 700,
                color: '#6B7280',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

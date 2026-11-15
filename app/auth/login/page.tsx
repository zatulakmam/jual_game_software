'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, Star, Zap, ShoppingBag } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (_data: LoginForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    toast.success('Login successful! Redirecting...', {
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
          {/* Background geometric shapes */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 300,
              height: 300,
              borderRadius: '50%',
              backgroundColor: '#F9ED32',
              opacity: 0.15,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 100,
              left: -80,
              width: 240,
              height: 240,
              borderRadius: '50%',
              backgroundColor: '#A78BFA',
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -40,
              right: 100,
              width: 180,
              height: 180,
              borderRadius: '50%',
              backgroundColor: '#55E6D1',
              opacity: 0.15,
            }}
          />

          {/* Logo area */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#F9ED32',
                  border: '3px solid #F9ED32',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={26} color="#171717" />
              </div>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
                PixelStore
              </span>
            </div>
          </div>

          {/* Center hero */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Big decorative shapes */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#F9ED32',
                  border: '3px solid #F9ED32',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={40} color="#171717" />
              </div>
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#A78BFA',
                  border: '3px solid #A78BFA',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={40} color="#171717" />
              </div>
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#55E6D1',
                  border: '3px solid #55E6D1',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={40} color="#171717" />
              </div>
            </div>

            <h1
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: 20,
                letterSpacing: -2,
              }}
            >
              Your Digital
              <br />
              <span style={{ color: '#F9ED32' }}>World Starts</span>
              <br />
              Here. ✦
            </h1>
            <p style={{ fontSize: 18, color: '#9CA3AF', fontWeight: 500, lineHeight: 1.6, maxWidth: 400 }}>
              Join thousands of users getting premium software, games, and digital tools at the best prices.
            </p>

            {/* Star decorations */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
                <span key={i} style={{ color: '#F9ED32', fontSize: i % 2 === 0 ? 20 : 14 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { value: '50K+', label: 'Happy Users' },
              { value: '1200+', label: 'Products' },
              { value: '99%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#F9ED32' }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
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
              <span style={{ fontSize: 22, fontWeight: 900, color: '#171717' }}>PixelStore</span>
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
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#171717', marginBottom: 8 }}>
                  Welcome back! 👋
                </h2>
                <p style={{ fontSize: 15, color: '#6B7280', fontWeight: 500 }}>
                  Sign in to your PixelStore account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Email */}
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
                    Email Address <span style={{ color: '#EF4444' }}>*</span>
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

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 14, fontWeight: 700, color: '#171717' }}>
                      Password <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      style={{ fontSize: 13, fontWeight: 700, color: '#A78BFA', textDecoration: 'none' }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password"
                      style={{
                        width: '100%',
                        padding: '11px 44px 11px 14px',
                        border: `2px solid ${errors.password ? '#EF4444' : '#171717'}`,
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 500,
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: '#171717',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        boxShadow: errors.password ? '3px 3px 0px #EF4444' : '3px 3px 0px #171717',
                        boxSizing: 'border-box',
                      }}
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
                  {errors.password && (
                    <p style={{ marginTop: 5, fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      {errors.password.message}
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
                    transition: 'transform 0.15s ease',
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
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 2, backgroundColor: '#E5E7EB' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#9CA3AF' }}>or</span>
                  <div style={{ flex: 1, height: 2, backgroundColor: '#E5E7EB' }} />
                </div>

                {/* Register link */}
                <p style={{ textAlign: 'center', fontSize: 15, fontWeight: 600, color: '#6B7280' }}>
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/auth/register"
                    style={{
                      color: '#171717',
                      fontWeight: 800,
                      textDecoration: 'none',
                      borderBottom: '2px solid #F9ED32',
                    }}
                  >
                    Create an account →
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

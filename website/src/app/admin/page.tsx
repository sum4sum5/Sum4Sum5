'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Hash, Lock, LogIn, Eye, EyeOff, User } from 'lucide-react';

type DailyStat = { date: string; count: number };
type AnalyticsResponse = {
  dailyStats: DailyStat[];
  toolPopularity: Array<{ tool: string; count: number }>;
  captionVibeMix: Array<{ label: string; count: number }>;
  topicLengthBuckets: Array<{ label: string; count: number }>;
};

const VIBE_LABELS: Record<string, string> = {
  funny: "สายฮา/กวนๆ",
  flirty: "สายอ่อย",
  "mu-telu": "สายมู/พลังบวก",
  "online-seller": "สายแม่ค้าออนไลน์",
};

function formatVibeLabel(id: string): string {
  return VIBE_LABELS[id] ?? id;
}

function AdminAuthBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/60 to-amber-50/50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(255,140,0,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,180,100,0.2),transparent_40%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[length:24px_24px] bg-[radial-gradient(circle_at_center,rgba(100,116,139,0.12)_1px,transparent_1px)] opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl"
        aria-hidden
      />
    </>
  );
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<AnalyticsResponse>({
    dailyStats: [],
    toolPopularity: [],
    captionVibeMix: [],
    topicLengthBuckets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/analytics', { method: 'GET' });
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        throw new Error('ไม่สามารถโหลดข้อมูลสถิติได้');
      }

      const result = (await response.json()) as AnalyticsResponse;
      setData(result);
    } catch {
      setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', { method: 'GET' });
        const result = (await response.json()) as { authenticated?: boolean };
        const authenticated = Boolean(result.authenticated);
        setIsAuthenticated(authenticated);
        if (authenticated) {
          await fetchData();
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoginError(null);
    setUsernameError(null);
    setPasswordError(null);

    let hasEmpty = false;
    if (!username.trim()) {
      setUsernameError('กรุณากรอกชื่อผู้ใช้');
      hasEmpty = true;
    }
    if (!password) {
      setPasswordError('กรุณากรอกรหัสผ่าน');
      hasEmpty = true;
    }
    if (hasEmpty) return;

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          const body = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error || 'เซิร์ฟเวอร์ยังตั้งค่าไม่ครบ');
        }
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
      setLoginError(null);
      setUsernameError(null);
      setPasswordError(null);
      await fetchData();
    } catch (e) {
      setLoginError(
        e instanceof Error ? e.message : 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      );
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setData({
      dailyStats: [],
      toolPopularity: [],
      captionVibeMix: [],
      topicLengthBuckets: [],
    });
  };

  if (authLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
        <AdminAuthBackdrop />
        <div className="relative z-10 text-slate-500 font-prompt font-semibold">กำลังตรวจสอบสิทธิ์...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
        <AdminAuthBackdrop />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl shadow-primary/5 backdrop-blur-md md:p-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-orange-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-prompt font-bold">Admin Login</h1>
            <p className="text-slate-500">สำหรับผู้ดูแลเว็บสุ่มสี่สุ่มห้าเท่านั้น</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <div
                className={`relative rounded-xl border bg-gray-50 transition-all focus-within:ring-2 ${
                  usernameError
                    ? 'border-red-400 focus-within:ring-red-200/80'
                    : 'border-slate-200 focus-within:ring-primary/40'
                }`}
              >
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError(null);
                    if (loginError) setLoginError(null);
                  }}
                  placeholder="ชื่อผู้ใช้ (username)"
                  aria-invalid={Boolean(usernameError)}
                  aria-describedby={usernameError ? 'admin-username-err' : undefined}
                  className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-left text-slate-800 placeholder:text-slate-400 outline-none"
                />
              </div>
              {usernameError && (
                <p id="admin-username-err" className="text-sm text-red-600 font-medium pl-1" role="alert">
                  {usernameError}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div
                className={`relative rounded-xl border bg-gray-50 transition-all focus-within:ring-2 ${
                  passwordError
                    ? 'border-red-400 focus-within:ring-red-200/80'
                    : 'border-slate-200 focus-within:ring-primary/40'
                }`}
              >
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                    if (loginError) setLoginError(null);
                  }}
                  placeholder="รหัสผ่าน"
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={passwordError ? 'admin-password-err' : undefined}
                  className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-14 text-left text-slate-800 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && (
                <p id="admin-password-err" className="text-sm text-red-600 font-medium pl-1" role="alert">
                  {passwordError}
                </p>
              )}
            </div>

            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" /> เข้าสู่ระบบ
            </button>
            {loginError && (
              <p className="text-sm text-red-500 text-center font-medium" role="alert">
                {loginError}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <nav className="bg-white/90 backdrop-blur px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 orange-gradient rounded-xl flex items-center justify-center text-white font-bold">ส</div>
            <h1 className="text-xl font-prompt font-bold">แผงควบคุมสถิติ</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="เหตุการณ์รวม (ในช่วงกราฟ)" 
            value={data.dailyStats.reduce((acc, curr) => acc + curr.count, 0)} 
            icon={<Users className="text-blue-500" />} 
          />
          <StatCard 
            title="วันที่มีเหตุการณ์มากที่สุด" 
            value={data.dailyStats.length > 0 ? [...data.dailyStats].sort((a, b) => b.count - a.count)[0].date : '-'} 
            icon={<TrendingUp className="text-green-500" />} 
          />
          <StatCard 
            title="ประเภทเครื่องมือ (จาก log)" 
            value={data.toolPopularity.length} 
            icon={<Hash className="text-orange-500" />} 
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 font-medium">{error}</div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Usage Chart */}
          <div className="lg:col-span-2 card space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">กราฟคนใช้รายวัน (7 วันล่าสุด)</h2>
              <button onClick={fetchData} className="text-xs text-primary font-bold">รีเฟรช</button>
            </div>
            <div className="h-[350px] w-full">
              {isLoading ? (
                 <div className="w-full h-full bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center text-slate-300">กำลังโหลด...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Line type="monotone" dataKey="count" stroke="#FF8C00" strokeWidth={4} dot={{r: 6, fill: '#FF8C00', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Usage breakdown (aligned with /api/usage payload — ไม่เก็บข้อความหัวข้อดิบ) */}
          <div className="card space-y-8 max-h-[800px] overflow-y-auto overflow-x-hidden">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800">ความนิยมตามเครื่องมือ</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                นับจากคอลัมน์ <code className="text-[10px] bg-slate-100 px-1 rounded">tool_key</code> ในฐานข้อมูล (สูงสุด 5,000 แถวล่าสุด)
              </p>
              <div className="space-y-2">
                {isLoading ? (
                  [1, 2, 3, 4].map((i) => <div key={i} className="h-12 bg-gray-50 animate-pulse rounded-xl" />)
                ) : data.toolPopularity.length > 0 ? (
                  data.toolPopularity.map((row, idx) => (
                    <div
                      key={row.tool}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl group hover:bg-orange-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-lg bg-white border text-xs font-bold text-slate-400">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-700 truncate">{row.tool}</span>
                      </div>
                      <span className="text-xs font-bold bg-white px-2 py-1 rounded-full border text-slate-500 group-hover:text-primary group-hover:border-primary transition-colors shrink-0">
                        {row.count} ครั้ง
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-300 text-sm">ยังไม่มีข้อมูล</div>
                )}
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-800">แคปชั่น AI — สไตล์ (vibe)</h2>
              <p className="text-xs text-slate-500">จากเหตุการณ์ &quot;Caption Randomizer&quot; เท่านั้น</p>
              <div className="space-y-2">
                {isLoading ? (
                  [1, 2, 3].map((i) => <div key={i} className="h-10 bg-gray-50 animate-pulse rounded-xl" />)
                ) : data.captionVibeMix.length > 0 ? (
                  data.captionVibeMix.map((row, idx) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between p-3 bg-slate-50/80 rounded-2xl border border-slate-100"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        <span className="text-slate-400 font-bold mr-2">{idx + 1}.</span>
                        {formatVibeLabel(row.label)}
                      </span>
                      <span className="text-xs font-bold text-primary">{row.count} ครั้ง</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-300 text-sm">ยังไม่มีข้อมูล vibe</div>
                )}
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-800">แคปชั่น AI — ความยาวหัวข้อ</h2>
              <p className="text-xs text-slate-500">จัดกลุ่มจาก <code className="text-[10px] bg-slate-100 px-1 rounded">topicLength</code> (ไม่เก็บข้อความหัวข้อ)</p>
              <div className="space-y-2">
                {isLoading ? (
                  [1, 2, 3].map((i) => <div key={i} className="h-10 bg-gray-50 animate-pulse rounded-xl" />)
                ) : data.topicLengthBuckets.length > 0 ? (
                  data.topicLengthBuckets.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between p-3 bg-slate-50/80 rounded-2xl border border-slate-100"
                    >
                      <span className="text-sm font-medium text-slate-700">{row.label}</span>
                      <span className="text-xs font-bold text-slate-600">{row.count} ครั้ง</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-300 text-sm">ยังไม่มีข้อมูลความยาว</div>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="card flex items-center gap-6 p-8">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-inner border border-white">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-prompt font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const BarChartComponent = () => {
  const data = [
    { name: 'Mon', tasks: 3 },
    { name: 'Tue', tasks: 5 },
    { name: 'Wed', tasks: 2 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 6 },
    { name: 'Sat', tasks: 4 },
    { name: 'Sun', tasks: 7 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
          itemStyle={{ color: '#fff' }}
          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
        />
        <Bar dataKey="tasks" fill="#a855f7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const PieChartComponent = () => {
  const data = [
    { name: 'High', value: 45, color: '#ef4444' },
    { name: 'Medium', value: 30, color: '#eab308' },
    { name: 'Low', value: 25, color: '#22c55e' },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const LineChartComponent = () => {
  const data = [
    { name: 'Week 1', prod: 45 },
    { name: 'Week 2', prod: 52 },
    { name: 'Week 3', prod: 48 },
    { name: 'Week 4', prod: 70 },
    { name: 'Week 5', prod: 61 },
    { name: 'Week 6', prod: 85 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
        <Line 
          type="monotone" 
          dataKey="prod" 
          stroke="#a855f7" 
          strokeWidth={3}
          dot={{ fill: '#ec4899', r: 4, strokeWidth: 0 }} 
          activeDot={{ r: 6, fill: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
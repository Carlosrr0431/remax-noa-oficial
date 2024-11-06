"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const ChartView = ({ data }) => (
    <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fontSize: 12 }}
                    padding={{ left: 0, right: 0 }}
                />
                <YAxis
                    yAxisId="left"
                    tickFormatter={(value) => `${value} u.`}
                    padding={{ top: 20, bottom: 0 }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    padding={{ top: 20, bottom: 0 }}
                />
                <Tooltip
                    formatter={(value, name) => {
                        if (name === 'price') return [`$${value.toLocaleString()}`, 'Costo Proyectado'];
                        return [value, name];
                    }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="projected" name="Cantidad a Comprar" fill="#2563eb" />
                <Bar yAxisId="left" dataKey="actual" name="Stock Actual" fill="#16a34a" />
                <Bar yAxisId="right" dataKey="price" name="Costo Proyectado" fill="#f59e0b" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
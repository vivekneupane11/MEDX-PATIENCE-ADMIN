import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StockChart = () => {
  const data = [
    { name: 'CPAP', value: 30, color: '#3B82F6' },
    { name: 'BPAP', value: 25, color: '#10B981' },
    { name: 'VNI', value: 15, color: '#8B5CF6' },
    { name: 'Autres', value: 10, color: '#F59E0B' }
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
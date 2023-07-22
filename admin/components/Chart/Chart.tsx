import styles from "./chart.module.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    Total: 1200,
  },
  {
    name: "February",
    Total: 2100,
  },
  {
    name: "March",
    Total: 800,
  },
  {
    name: "April",
    Total: 1600,
  },
  {
    name: "May",
    Total: 900,
  },
  {
    name: "June",
    Total: 1700,
  },
];

const Chart = ({
  aspect,
  title,
  stats,
}: {
  aspect: number;
  title: string;
  stats?: any;
}) => {
  return (
    <div className={styles.chart}>
      <div className={styles.title}>{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={stats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" stroke="gray" />
          {/* <YAxis /> */}
          <CartesianGrid strokeDasharray="3 3" className={styles.chartGrid} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#Total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

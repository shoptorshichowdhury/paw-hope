import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  BellRing,
  BriefcaseBusiness,
  DollarSign,
  FilePlus2,
} from "lucide-react";
import { useQuery } from "react-query";

import {
  PieChart,
  Pie,
  Legend,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "pink", "red"];
const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28", "pink", "red"];

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get overview stats
  const { data: stats = [] } = useQuery({
    queryKey: ["stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/overview-stats/${user?.email}`);
      return data;
    },
  });

  //get pets data
  const { data: pets = [] } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pets/${user?.email}`);
      return data;
    },
  });

  //get donation data
  const { data: chartData = [] } = useQuery({
    queryKey: ["myDonationCampaigns", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-donation-campaigns/${user?.email}`
      );
      return data;
    },
  });

  //custom shape for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // pie-chart data [custom get name & value]
  const pieChartData = pets.map((data) => {
    return { name: data.category, value: data.price };
  });

  //  --- bar cart----
  //custom shape for bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <section className="my-5">
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* my added pets */}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>Total Added Pets</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              {stats.totalPets}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
            <FilePlus2 />
          </div>
        </div>
        {/* my donation campaigns */}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>Total Donation Campaigns</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              {stats?.myDonationCampaigns}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
            <BriefcaseBusiness />
          </div>
        </div>
        {/* my total donations*/}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>My Total Donations</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              ${stats?.totalDonations}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
            <DollarSign />
          </div>
        </div>
        {/* adoption requests for my pets*/}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>Adoption Requests</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              {stats?.myAdoptionRequests}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
            <BellRing />
          </div>
        </div>
      </div>
      {/* contianer */}
      <div className="mt-10 flex flex-col lg:flex-row gap-5 justify-between">
        {/* pets overview */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Pets Overview</h3>
          <div>
            <PieChart width={300} height={300}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </div>
        </div>
        {/* donation overview */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">
            Donation Overview
          </h3>
          <div>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="donatedAmount" />
              <YAxis />
              <Bar
                dataKey="maxAmount"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                ))}
              </Bar>
              <Legend></Legend>
            </BarChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

import { FaWallet } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { BiPieChartAlt2 } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import { MdOutlinePhoneIphone } from "react-icons/md";

export const features = [
  {
    title: "Track Every Penny",
    description:
      "Keep track of all your income and expenses in one place with easy categorization and detailed records.",
    icon: FaWallet,
    color: "text-blue-600",
  },
  {
    title: "Visual Analytics",
    description:
      "Understand your spending patterns with beautiful charts and graphs showing daily, weekly, and monthly trends.",
    icon: MdBarChart,
    color: "text-green-600",
  },
  {
    title: "Category Breakdown",
    description:
      "See exactly where your money goes with detailed category-wise expense analysis and insights.",
    icon: BiPieChartAlt2,
    color: "text-purple-600",
  },
  {
    title: "Smart Insights",
    description:
      "Get intelligent insights about your spending habits and savings rate to make better financial decisions.",
    icon: FiTrendingUp,
    color: "text-orange-600",
  },
  {
    title: "Secure & Private",
    description:
      "Your financial data is safe and secure. We prioritize your privacy and protect your information.",
    icon: HiShieldCheck,
    color: "text-red-600",
  },
  {
    title: "Responsive Design",
    description:
      "Access your finances anywhere, anytime. Works perfectly on desktop, tablet, and mobile devices.",
    icon: MdOutlinePhoneIphone,
    color: "text-indigo-600",
  },
];

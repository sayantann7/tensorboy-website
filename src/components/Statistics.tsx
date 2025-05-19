import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Radar } from 'react-chartjs-2';

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import { FaUsers, FaChartLine, FaEye, FaHandshake } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  RadialLinearScale, 
  PointElement, 
  LineElement,
  Filler
);

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create gradient for chart
const createGradient = (ctx, colorStart, colorEnd) => {
  if (!ctx) return colorStart; // Return solid color as fallback
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
};

const AnimatedCounter = ({ value, duration = 2, decimals = 0, suffix = "" }) => {
  const counterRef = useRef(null);
  
  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;
    
    let startTime;
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const endValue = isNaN(numericValue) ? 0 : numericValue;
    
    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = progress * endValue;
      
      element.textContent = currentCount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [value, duration, decimals, suffix]);
  
  return <span ref={counterRef}>0{suffix}</span>;
};

const FloatingStatCard = ({ icon, title, value, description }) => {
  const frameRef = useRef(null);
  const iconRef = useRef(null);
  const valueRef = useRef(null);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((yPos - centerY) / centerY) * -5;
    const rotateY = ((xPos - centerX) / centerX) * 5;

    gsap.to(element, {
      duration: 0.5,
      rotateX,
      rotateY,
      transformPerspective: 800,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative border border-violet-neon/30 bg-dark-200 rounded-lg p-6 text-center transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div ref={iconRef} className="text-3xl text-neon-green mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p ref={valueRef} className="text-3xl font-bold mb-3 text-blue-neon">
        <AnimatedCounter value={value} suffix={value.includes("+") ? "+" : ""} />
      </p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

const AgeDistributionChart = () => {
  const chartRef = useRef(null);
  
  const data = {
    labels: ['18-24', '25-34', '35-44', '45+'],
    datasets: [
      {
        data: [35, 45, 15, 5],
        backgroundColor: ['#FF00FF', '#00FFFF', '#39FF14', '#9D00FF'],
        borderColor: ['rgba(255, 0, 255, 0.9)', 'rgba(0, 255, 255, 0.9)', 'rgba(57, 255, 20, 0.9)', 'rgba(157, 0, 255, 0.9)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#DFDFF0',
          font: {
            family: "'circular-web', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 15, 20, 0.85)',
        titleColor: '#FFFFFF',
        bodyColor: '#DFDFF0'
      }
    },
    cutout: '65%'
  };

  return (
    <div className="h-64 md:h-72 w-full" style={{minHeight: '16rem'}}>
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

const OccupationChart = () => {
  const data = {
    labels: ['Students', 'Developers', 'Data Scientists', 'Other Tech'],
    datasets: [
      {
        label: 'Percentage',
        data: [40, 30, 20, 10],
        backgroundColor: ['rgba(0, 255, 255, 0.7)', 'rgba(57, 255, 20, 0.7)', 'rgba(255, 0, 255, 0.7)', 'rgba(157, 0, 255, 0.7)'],
        borderColor: ['#00FFFF', '#39FF14', '#FF00FF', '#9D00FF'],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(15, 15, 20, 0.85)'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#DFDFF0'
        }
      }
    }
  };

  return (
    <div className="h-64 md:h-72 w-full" style={{minHeight: '16rem'}}>
      <Bar data={data} options={options} />
    </div>
  );
};

const Statistics = () => {
  const sectionRef = useRef(null);
  const chartsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('demographics');
  const [chartsInitialized, setChartsInitialized] = useState(false);
  
  // Force charts to render after component mounts
  useEffect(() => {
    // Short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setChartsInitialized(true);
      
      // Force window resize to help Chart.js initialize properly
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add special styles to ensure charts are visible
  useEffect(() => {
    // Add necessary CSS directly to head
    const style = document.createElement('style');
    style.textContent = `
      #statistics, #statistics * {
        visibility: visible !important;
        opacity: 1 !important;
      }
      #statistics canvas {
        display: block !important;
        height: 100% !important;
        width: 100% !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Force resize event after tab change to fix chart rendering
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
  };

  return (
    <div ref={sectionRef} id="statistics" className="min-h-dvh w-screen bg-dark-100 text-white py-16">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-neon-pink">Audience Insights</h2>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Numbers for Potential Collaborators</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="stat-card">
            <FloatingStatCard 
              icon={<FaUsers />}
              title="Followers" 
              value="170K+" 
              description="Across Instagram, Twitter & LinkedIn" 
            />
          </div>
          <div className="stat-card">
            <FloatingStatCard 
              icon={<FaChartLine />}
              title="Growth Rate" 
              value="5.8K" 
              description="New followers per month" 
            />
          </div>
          <div className="stat-card">
            <FloatingStatCard 
              icon={<FaEye />}
              title="Weekly Impressions" 
              value="1.2M+" 
              description="Content views & engagement" 
            />
          </div>
          <div className="stat-card">
            <FloatingStatCard 
              icon={<FaHandshake />}
              title="Collaborations" 
              value="24+" 
              description="Successful brand partnerships" 
            />
          </div>
        </div>
        
        <div ref={chartsRef} className="bg-dark-300 rounded-xl p-6 border border-blue-neon/20">
          <div className="border-b border-blue-neon/20 mb-6">
            <div className="flex">
              <button 
                onClick={() => handleTabChange('demographics')} 
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'demographics' ? 'text-neon-green border-b-2 border-neon-green' : 'text-gray-400'}`}
              >
                Demographics
              </button>
              <button 
                onClick={() => handleTabChange('engagement')} 
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'engagement' ? 'text-neon-green border-b-2 border-neon-green' : 'text-gray-400'}`}
              >
                Engagement Metrics
              </button>
            </div>
          </div>
          
          {chartsInitialized && (
            <div className="chart-content" style={{minHeight: '350px'}}>
              {activeTab === 'demographics' ? (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center">Audience Demographics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-dark-200 p-5 rounded-lg">
                      <h4 className="text-lg mb-4 text-blue-neon text-center">Age Distribution</h4>
                      <AgeDistributionChart />
                    </div>
                    <div className="bg-dark-200 p-5 rounded-lg">
                      <h4 className="text-lg mb-4 text-blue-neon text-center">Occupation</h4>
                      <OccupationChart />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-4">Monthly Engagement</h3>
                  <p className="text-gray-400 mb-8">Chart showing engagement metrics over time</p>
                  <div className="bg-dark-200 p-4 rounded-lg inline-block">
                    <p className="text-xl mb-2">95% Engagement Rate</p>
                    <p className="text-gray-400">15% increase from previous month</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <p className="max-w-lg mx-auto text-lg mb-4">
            Interested in collaborating? Let's create engaging AI content that resonates with my tech-focused audience.
          </p>
          <Button
            id="collab-btn"
            title="Discuss collaboration"
            containerClass="bg-neon-green text-dark-100 hover:bg-neon-green/90 hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
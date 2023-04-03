import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const ProjectCharts = ({ projects = [] }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (
      !projects.length ||
      !projects.every(
        (project) => typeof project === 'object' && project.hasOwnProperty('category')
      )
    ) {
      return;
    }

    const projectCategories = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(projectCategories),
      datasets: [
        {
          data: Object.values(projectCategories),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    });
  }, [projects]);

  return (
    <div className="project-charts">{chartData && <Pie data={chartData} />}</div>
  );
};

export default ProjectCharts;

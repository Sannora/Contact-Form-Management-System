import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CssBaseline, Paper, Typography, Box } from '@mui/material';

const Reports = () => {
  const [countryData, setCountryData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = useSelector(state => state.user.role);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/401');
      return;
    }

    const fetchMessageData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const messages = response.data.data.messages;
        const countryMessageCount = messages.reduce((acc, message) => {
          const { country } = message;
          if (acc[country]) {
            acc[country]++;
          } else {
            acc[country] = 1;
          }
          return acc;
        }, {});

        // Verileri büyükten küçüğe sırala
        const sortedData = Object.keys(countryMessageCount)
          .filter(country => countryMessageCount[country] > 0)
          .map(country => ({
            country,
            messageCount: countryMessageCount[country],
          }))
          .sort((a, b) => b.messageCount - a.messageCount);

        setCountryData(sortedData);
      } catch (err) {
        setError(err.response.data.error);
        console.error('Veri çekme sırasında hata oluştu:', err);
      }
    };

    fetchMessageData();
  }, [role, navigate]);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const messages = response.data.data.messages;
        const genderCount = messages.reduce((acc, message) => {
          const { gender } = message;
          if (acc[gender]) {
            acc[gender]++;
          } else {
            acc[gender] = 1;
          }
          return acc;
        }, {});

        const chartData = Object.keys(genderCount).map(gender => ({
          name: gender === 'male' ? 'Male' : 'Female',
          value: genderCount[gender],
        }));

        setGenderData(chartData);
      } catch (error) {
        setError(error.response.data.error);
        console.error('Veri çekme sırasında hata oluştu:', error);
      }
    };

    fetchGenderData();
  }, []);

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100%', py: 5, backgroundColor: 'white.background', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '80%', md: '60%' } }}>
          <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Message Count Based on Country Data
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis tickFormatter={(value) => value.toFixed(0)} />
                <Tooltip />
                <Legend formatter={() => "Message Count"} />
                <Bar dataKey="messageCount" fill='#3B55D9' barSize={70} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Message Distribution Based on Gender Data
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Reports;

import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { Business, Favorite, Speed } from '@mui/icons-material';

function About() {
  const values = [
    {
      icon: <Business sx={{ fontSize: 40 }} />,
      title: 'Our Mission',
      description: 'To provide high-quality products at competitive prices while ensuring an exceptional shopping experience for our customers.'
    },
    {
      icon: <Favorite sx={{ fontSize: 40 }} />,
      title: 'Our Values',
      description: 'Customer satisfaction, integrity, innovation, and sustainability are at the heart of everything we do.'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Our Vision',
      description: 'To become the leading e-commerce platform known for reliability, variety, and customer-centric approach.'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
    },
    {
      name: 'Sarah Johnson',
      position: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    },
    {
      name: 'Michael Chen',
      position: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        {/* Hero Section */}
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          About TLG Store
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 8 }}>
          Your Trusted Shopping Destination Since 2024
        </Typography>

        {/* Company Values */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {values.map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {value.icon}
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Company Story */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            Founded in 2024, TLG Store began with a simple mission: to revolutionize the online shopping experience. What started as a small e-commerce venture has grown into a trusted marketplace serving customers worldwide.
          </Typography>
          <Typography variant="body1" paragraph>
            We take pride in our carefully curated selection of products, rigorous quality control, and commitment to customer satisfaction. Our team works tirelessly to ensure that every purchase meets our high standards.
          </Typography>
        </Box>

        {/* Team Section */}
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h6" component="h3" align="center">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {member.position}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default About; 
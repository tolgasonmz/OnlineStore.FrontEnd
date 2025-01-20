import React from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocalShipping,
  Payment,
  Help,
  Security
} from '@mui/icons-material';

function FAQ() {
  const categories = [
    {
      title: 'Shipping',
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email that you can use to monitor your delivery status.'
        }
      ]
    },
    {
      title: 'Payment',
      icon: <Payment sx={{ fontSize: 40 }} />,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.'
        },
        {
          question: 'Is it safe to use my credit card on your site?',
          answer: 'Yes, our website uses SSL encryption to protect your personal and payment information. We never store your credit card details.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer full refunds within 30 days of purchase if you\'re not satisfied with your product.'
        }
      ]
    },
    {
      title: 'Returns & Refunds',
      icon: <Help sx={{ fontSize: 40 }} />,
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 30 days of purchase. Items must be unused and in their original packaging.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Log into your account, go to your orders, and select "Return Item". Follow the instructions to print your return label.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Once we receive your return, refunds are processed within 3-5 business days. It may take additional time to appear on your statement.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: <Security sx={{ fontSize: 40 }} />,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner and follow the prompts to create your account.'
        },
        {
          question: 'How can I reset my password?',
          answer: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard security measures to protect your personal information and never share it with third parties.'
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        {/* Header */}
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 8 }}>
          Find Answers to Common Questions
        </Typography>

        {/* FAQ Categories */}
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h4" component="h2">
                      {category.title}
                    </Typography>
                  </Box>

                  {category.questions.map((faq, faqIndex) => (
                    <Accordion key={faqIndex}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${faqIndex}-content`}
                        id={`panel${faqIndex}-header`}
                      >
                        <Typography variant="h6">
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body1" color="text.secondary">
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default FAQ; 
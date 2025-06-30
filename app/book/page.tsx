"use client"
import React, { useState, useEffect } from 'react';

// Type definitions
interface FlightData {
  airline_name: string;
  flight_name: string;
  origincode: string;
  destinationcode: string;
  departuredate: string;
  arrivaldate: string;
  duration: number;
  equipmenttext?: string;
  air_logo?: string;
}

interface FlightInfo {
  air_logo?: string;
  itin_details: {
    flight_data: FlightData[];
  }[];
  price_info: {
    base: number;
    total: number;
    currency: string;
  };
}

interface SearchParams {
  origin: string;
  destination: string;
  originName?: string;
  destinationName?: string;
  departureDate: string;
  adults: string;
  children: string;
  infants?: string;
}

interface ParsedFlightData {
  flight: FlightInfo;
  searchParams: SearchParams;
}
import {
  Steps,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Divider,
  Typography,
  Alert,
  Checkbox,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined,
  CalendarOutlined,
  GlobalOutlined,
  PlusOutlined
} from '@ant-design/icons';
// Using built-in Date methods instead of dayjs

const { Title, Text } = Typography;
const { Option } = Select;

const FlightBookingUI = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [flightData, setFlightData] = useState<ParsedFlightData | null>(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    {
      title: 'Details',
      description: 'Passenger Information'
    },
    {
      title: 'Review',
      description: 'Review Details'
    },
    {
      title: 'Payment',
      description: 'Complete Payment'
    }
  ];

  const passengerTypes = [
    { value: 'mr', label: 'Mr.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'dr', label: 'Dr.' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const countries = [
    { value: 'bd', label: 'Bangladesh' },
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ];

  // Parse URL data on component mount
  useEffect(() => {
    const parseUrlData = () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const dataParam = urlParams.get('data');
        
        if (dataParam) {
          // Decode the URL-encoded data
          const decodedData = decodeURIComponent(dataParam);
          const parsedData: ParsedFlightData = JSON.parse(decodedData);
          setFlightData(parsedData);
        } else {
          // Fallback demo data if no URL params
          const fallbackData: ParsedFlightData = {
            flight: {
              air_logo: "https://env-9893493.nl.realcloud.in/tbp/air_logo/TG.svg",
              itin_details: [{
                flight_data: [{
                  airline_name: "Thai Airways",
                  flight_name: "TG-301",
                  origincode: "DAC",
                  destinationcode: "DXB",
                  departuredate: "2025-06-30T09:00:00.000Z",
                  arrivaldate: "2025-06-30T14:40:00.000Z",
                  duration: 280,
                  equipmenttext: "Boeing 737-800"
                }]
              }],
              price_info: {
                base: 6969,
                total: 6969,
                currency: "BDT"
              }
            },
            searchParams: {
              origin: "DAC",
              destination: "DXB",
              originName: "Hazrat Shahjalal International Airport",
              destinationName: "Dubai International Airport",
              departureDate: "30 Jun 2025",
              adults: "1",
              children: "0",
              infants: "0"
            }
          };
          setFlightData(fallbackData);
        }
      } catch (error) {
        console.error('Error parsing URL data:', error);
        // Set fallback data on error
        const errorFallbackData: ParsedFlightData = {
          flight: {
            air_logo: "",
            itin_details: [{
              flight_data: [{
                airline_name: "Sample Airline",
                flight_name: "SA-123",
                origincode: "DAC",
                destinationcode: "DXB",
                departuredate: "2025-06-30T09:00:00.000Z",
                arrivaldate: "2025-06-30T14:40:00.000Z",
                duration: 280
              }]
            }],
            price_info: {
              base: 5000,
              total: 5000,
              currency: "BDT"
            }
          },
          searchParams: {
            origin: "DAC",
            destination: "DXB",
            departureDate: "30 Jun 2025",
            adults: "1",
            children: "0"
          }
        };
        setFlightData(errorFallbackData);
      } finally {
        setLoading(false);
      }
    };

    parseUrlData();
  }, []);

  // Helper functions
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const PassengerForm = ({ passengerType, index }: { passengerType: string; index: number }) => (
    <Card 
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Passenger Info</span>
          <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
            {passengerType} {index}
          </span>
        </div>
      }
      className="mb-4"
    >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item 
            label={<span className="font-medium">Title<span className="text-red-500">*</span></span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'title']}
            rules={[{ required: true, message: 'Please select title' }]}
          >
            <Select placeholder="Select Title">
              {passengerTypes.map(type => (
                <Option key={type.value} value={type.value}>{type.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item 
            label={<span className="font-medium">First Name<span className="text-red-500">*</span></span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'firstName']}
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="FIRST NAME" />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item 
            label={<span className="font-medium">Last Name<span className="text-red-500">*</span></span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'lastName']}
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="LAST NAME" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item 
            label={<span className="font-medium">Date of Birth<span className="text-red-500">*</span></span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'dateOfBirth']}
            rules={[{ required: true, message: 'Please select date of birth' }]}
          >
            <DatePicker 
              placeholder="YYYY-MM-DD" 
              className="w-full"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item 
            label={<span className="font-medium">Country</span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'country']}
          >
            <Select placeholder="Select Country">
              {countries.map(country => (
                <Option key={country.value} value={country.value}>{country.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item 
            label={<span className="font-medium">Gender<span className="text-red-500">*</span></span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'gender']}
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select placeholder="Select Gender">
              {genderOptions.map(gender => (
                <Option key={gender.value} value={gender.value}>{gender.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item 
            label={<span className="font-medium">Email</span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'email']}
            rules={[{ type: 'email', message: 'Please enter valid email' }]}
          >
            <Input 
              placeholder="email@example.com" 
              prefix={<MailOutlined className="text-gray-400" />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item 
            label={<span className="font-medium">Phone Number</span>}
            name={[`passenger_${passengerType.toLowerCase()}_${index}`, 'phone']}
          >
            <Input 
              placeholder="01XXXXXXXX" 
              prefix={<PhoneOutlined className="text-gray-400" />}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!flightData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert message="Failed to load flight data" type="error" />
      </div>
    );
  }

  const flight = flightData.flight.itin_details[0].flight_data[0];
  const searchParams = flightData.searchParams;

  // Generate passenger forms based on search parameters
  const renderPassengerForms = () => {
    const forms = [];
    
    // Adult passengers
    const adultCount = parseInt(searchParams.adults) || 1;
    for (let i = 1; i <= adultCount; i++) {
      forms.push(<PassengerForm key={`adult-${i}`} passengerType="Adult" index={i} />);
    }
    
    // Children passengers
    const childCount = parseInt(searchParams.children) || 0;
    for (let i = 1; i <= childCount; i++) {
      forms.push(<PassengerForm key={`child-${i}`} passengerType="Child" index={i} />);
    }
    
    // Infant passengers
    const infantCount = parseInt(searchParams.infants) || 0;
    for (let i = 1; i <= infantCount; i++) {
      forms.push(<PassengerForm key={`infant-${i}`} passengerType="Infant" index={i} />);
    }
    
    return forms;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Steps */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <Steps current={currentStep} items={steps} />
      </div>

      {/* Main Content */}
      <Row gutter={24}>
        {/* Left Column - Form */}
        <Col span={16}>
          <div className="bg-white rounded-lg p-6">
            {/* Notice */}
            <Alert
              message={
                <span>
                  Please don't put wrong information or Test data for <strong>Avoid ADM</strong>
                </span>
              }
              type="warning"
              showIcon
              className="mb-6"
            />

            {/* Dynamic Flight Info */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  {flightData.flight.air_logo ? (
                    <img src={flightData.flight.air_logo} alt="Airline" className="w-10 h-10" />
                  ) : (
                    <span className="text-white font-bold text-xl">✈</span>
                  )}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {flight.origincode} {formatTime(flight.departuredate)}
                  </div>
                  <div className="text-gray-600">{formatDate(flight.departuredate)}</div>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Non Stop</div>
                  <div className="border-t-2 border-dashed border-gray-300 w-32 relative">
                    <div className="absolute -top-2 right-0 text-xl">✈</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{formatDuration(flight.duration)}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {flight.destinationcode} {formatTime(flight.arrivaldate)}
                </div>
                <div className="text-gray-600">{formatDate(flight.arrivaldate)}</div>
              </div>
            </div>

            <Form form={form} layout="vertical">
              {renderPassengerForms()}
            </Form>
          </div>
        </Col>

        {/* Right Column - Summary */}
        <Col span={8}>
          <Card className="sticky top-6">
            <Title level={4} className="mb-4 text-gray-700">ITINERARY DETAILS</Title>
            
            {/* Flight Details */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{flight.origincode} ~ {flight.destinationcode}</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✈</span>
                  </div>
                  <span className="text-sm">{flight.flight_name}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded mb-2">
                <div className="text-sm font-medium text-blue-800">
                  Departure: {formatDate(flight.departuredate)}, {formatTime(flight.departuredate)}
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded mb-2">
                <div className="text-sm font-medium text-blue-800">
                  Arrival: {formatDate(flight.arrivaldate)}, {formatTime(flight.arrivaldate)}
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-2">
                <div>Aircraft: {flight.equipmenttext || 'N/A'}</div>
                <div>Airline: {flight.airline_name}</div>
              </div>
            </div>

            <Divider />

            {/* Dynamic Passenger Summary */}
            <div className="mb-6">
              {parseInt(searchParams.adults) > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Adult ({searchParams.adults})</span>
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Base fare: {Math.floor(flightData.flight.price_info.base * 0.7)}
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Tax: {Math.floor(flightData.flight.price_info.base * 0.3)}
                  </div>
                </div>
              )}
              
              {parseInt(searchParams.children) > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Child ({searchParams.children})</span>
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Base fare: {Math.floor(flightData.flight.price_info.base * 0.5)}
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Tax: {Math.floor(flightData.flight.price_info.base * 0.2)}
                  </div>
                </div>
              )}
            </div>

            <Divider />

            {/* Price Summary */}
            <div className="mb-6">
              <Title level={4} className="mb-4 text-gray-700">PRICE SUMMARY</Title>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Base Amount</span>
                  <span>{flightData.flight.price_info.base}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Tax & Fees</span>
                  <span>{Math.floor(flightData.flight.price_info.base * 0.3)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>{flightData.flight.price_info.currency} {flightData.flight.price_info.total}</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <Checkbox className="mb-2">
                <span className="text-sm">
                  By continuing you agree to the <a href="#" className="text-blue-500">Fare Rule</a>
                </span>
              </Checkbox>
              <Checkbox>
                <span className="text-sm">
                  By continuing you agree to the <a href="#" className="text-blue-500">Terms & Condition</a>
                </span>
              </Checkbox>
            </div>

            {/* Next Button */}
            <Button 
              type="primary" 
              size="large" 
              block
              className="bg-blue-600 border-blue-600 hover:bg-blue-700"
              onClick={() => setCurrentStep(1)}
            >
              Next
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FlightBookingUI;
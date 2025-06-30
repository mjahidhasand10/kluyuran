import { Button, Text, VideoPlayer } from "@/components";
import { Package, Recommendation, Value } from "@/components/cards";
import { Search } from "@/components/forms";
import { CalendarArrowCounterClockWise, Earth } from "@/components/icons";
import { Template } from "@/components/layout";
import Image from "next/image";

const Home = () => {
  return (
    <Template>
      <main>
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/packages/road-to-the-desert.jpg"
              alt="Desert road with traditional architecture and mountains"
              fill
              className="object-cover"
              priority
            />
            {/* Blue overlay gradient */}
            <div className="absolute inset-0"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <div className="max-w-4xl mb-16">
              <Text
                as="h1"
                className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                Explore The World Around You
              </Text>
              <Text
                as="p"
                className="text-white/90 text-lg md:text-xl mb-16 max-w-2xl mx-auto"
              >
                Take a break from the stress of everyday life, plan trips and
                explore your favorite destinations
              </Text>
            </div>

            {/* Search Form */}
            <Search />
          </div>
        </section>

        {/* Popular Packages */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <Text as="h2" className="mb-4">
              Popular Packages
            </Text>
            <Text as="p" className="text-gray-600 mb-12 max-w-2xl mx-auto">
              The most popular tour packages presented to you
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Package
                img="/images/packages/bali-indonesian.jpg"
                location="Bali, Indonesia"
                days={3}
                nights={2}
              />
              <Package
                img="/images/packages/yogyakarta.jpg"
                location="Yogyakarta, Indonesia"
                days={4}
                nights={3}
              />
              <Package
                img="/images/packages/Kelingking_Beach.jpg"
                location="Nusa Penida, Indonesia"
                days={3}
                nights={2}
              />
              <Package
                img="/images/packages/rembang.jpg"
                location="Rembang, Indonesia"
                days={4}
                nights={3}
              />
            </div>

            <Button>Explore More</Button>
          </div>
        </section>

        {/* Top Values */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <Text as="h2" className="mb-4">
              Top Value From Us For You
            </Text>
            <Text as="p" className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Try a variety of benefits when using our services
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Value
                icon={<Earth />}
                title="Lot of Choices"
                description="Total 500+ Destinations that we work with"
              />
              <Value
                icon={
                  <Image
                    src="/images/hiking.jpg"
                    alt=""
                    width={24}
                    height={24}
                  />
                }
                title="Best Tour Guide"
                description="Our Tour Guide with 10+ years of experience"
              />
              <Value
                icon={<CalendarArrowCounterClockWise />}
                title="Easy Booking"
                description="With an easy and fast ticket purchase process"
              />
            </div>

            <VideoPlayer />
          </div>
        </section>

        {/* Travel Recommendations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <Text as="h2" className="mb-4">
                  Travel Recommendations
                </Text>
                <Text as="p" className="text-gray-600 max-w-lg">
                  The best travel recommendations from around the world for you
                </Text>
              </div>
              <Button>Explore More</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Recommendation
                imageUrl="/images/recommendations/friuli-investimento-sul-turismo.webp"
                location="Wates Beach"
                rating={4.9}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={122.23}
              />
              <Recommendation
                imageUrl="/images/recommendations/ngliyep-beach.webp"
                location="Ngliyep Beach"
                rating={4.5}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={132.65}
              />
              <Recommendation
                imageUrl="/images/recommendations/fantasy-island-beach-resort.webp"
                location="Fantasy Island Beach"
                rating={4.6}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={148.43}
              />
              <Recommendation
                imageUrl="/images/recommendations/infinity-bay-spa-and-beach-resort.jpg"
                location="Infinity Bay Spa"
                rating={4.3}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={227}
              />
              <Recommendation
                imageUrl="/images/recommendations/kimpton-grand-roatan.webp"
                location="Kimpton Grand Roatan"
                rating={4.7}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={352}
              />
              <Recommendation
                imageUrl="/images/recommendations/caribe-tesoro.webp"
                location="Caribe Tesoro"
                rating={4.3}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={171}
              />
              <Recommendation
                imageUrl="/images/recommendations/puerta-azul.webp"
                location="Puerta Azul"
                rating={4.9}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={171}
              />
              <Recommendation
                imageUrl="/images/recommendations/blue-roatan.avif"
                location="Blue Roatan Resort"
                rating={4.7}
                description="Tour package 3 days 2 nights with a good and friendly tour guide."
                price={214}
              />
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <Text as="h2" className="mb-4">
              Our latest articles about travel
            </Text>
            <Text as="p" className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Know the latest articles about travel
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Package
                img="/images/packages/breezes-resort-bahamas-all-inclusive.webp"
                location="Breezes Resort Bahamas All Inclusive"
              />
              <Package
                img="/images/packages/courtyard.webp"
                location="Courtyard by Marriott Nassau Downtown/Junkanoo Beach"
              />
              <Package
                img="/images/packages/grand-hyatt-baha-mar.avif"
                location="Grand Hyatt Baha Mar"
              />
            </div>

            <Button>Explore More</Button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <Text as="h2" className="mb-4">
              Subscribe To Get The Latest News About Us
            </Text>
            <Text as="p" className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We recommended you to subscribe, drop your email below to get
              daily update about us
            </Text>
          </div>
        </section>
      </main>
    </Template>
  );
};

export default Home;

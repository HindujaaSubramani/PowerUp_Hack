import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const Support = () => {
  const handleMentorshipClick = () => {
    window.open("https://schoolhouse.world", "_blank");
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Mentorship & Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance from experienced professionals and connect with a supportive learning community.
          </p>
        </div>

        {/* Main Mentorship Card */}
        <Card className="border-2 border-primary/20 mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎓</span>
            </div>
            <CardTitle className="text-2xl">Free Mentorship Program</CardTitle>
            <CardDescription className="text-base">
              Connect with industry experts through our partnership with Schoolhouse.world
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">What You'll Get:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    1-on-1 guidance from industry professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Career advice and pathway planning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Code reviews and technical feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Interview preparation and tips
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Access to exclusive learning resources
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">How It Works:</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">1.</span>
                    Click the button below to visit Schoolhouse.world
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">2.</span>
                    Create your free account and complete your profile
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">3.</span>
                    Browse mentors by expertise and availability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">4.</span>
                    Schedule your first mentorship session
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Button 
                onClick={handleMentorshipClick}
                className="px-8 py-3 text-lg"
                size="lg"
              >
                Connect with Mentors
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Completely free through our partnership
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Is the mentorship really free?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Through our partnership with Schoolhouse.world, all mentorship sessions are completely free. 
                  Mentors volunteer their time to help learners grow.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">How often can I meet with a mentor?</h4>
                <p className="text-sm text-muted-foreground">
                  This depends on your mentor's availability. Most mentors offer weekly or bi-weekly sessions, 
                  but you can discuss a schedule that works for both of you.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What if I can't find a mentor in my field?</h4>
                <p className="text-sm text-muted-foreground">
                  Schoolhouse.world has mentors across many technology domains. If you can't find someone immediately, 
                  you can join a waitlist or request a specific expertise area.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Support;
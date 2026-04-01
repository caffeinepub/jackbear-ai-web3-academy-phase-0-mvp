import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  GraduationCap,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ImpactPage() {
  const [formData, setFormData] = useState({
    partnerName: "",
    contactEmail: "",
    companyName: "",
    companyAddress: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      "Application submitted successfully! We will review your submission and contact you soon.",
    );
    setFormData({
      partnerName: "",
      contactEmail: "",
      companyName: "",
      companyAddress: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="relative container max-w-6xl py-12 space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Impact & Scholarships
              </h1>
              <p className="text-sm text-muted-foreground">
                Empowering Global Education Through Technology
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="space-y-6">
          <div className="border border-primary/20 rounded-lg p-8 bg-primary/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Our Vision for Global Impact
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  At JACKBEAR.ai, we believe that access to cutting-edge AI
                  tools and Web3 education should not be limited by economic
                  circumstances. Our mission is to sponsor CaffeineAI
                  subscriptions for underprivileged and Indigenous students
                  globally, empowering them with the tools they need to succeed
                  in the digital age.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Through our scholarship program, we aim to bridge the digital
                  divide and create opportunities for learners from all
                  backgrounds to access world-class AI-powered productivity
                  tools, educational resources, and community support.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-6 bg-card/50 hover:border-primary/30 hover:shadow-glow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Global Reach
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Supporting students from underserved communities worldwide with
                access to premium AI tools and education.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card/50 hover:border-primary/30 hover:shadow-glow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Educational Focus
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Providing comprehensive Web3 and AI education through our
                academy platform and learning resources.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card/50 hover:border-primary/30 hover:shadow-glow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Empowerment
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Equipping learners with cutting-edge tools to unlock their
                potential and succeed in the digital economy.
              </p>
            </div>
          </div>
        </div>

        {/* Graduate Eligibility Section */}
        <div className="border border-accent/20 rounded-lg p-8 bg-accent/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Graduate Scholarship Eligibility
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Students who successfully complete courses and achieve
                milestones in the JACKBEAR.ai Academy may qualify for sponsored
                CaffeineAI subscriptions. Our scholarship program recognizes
                dedication, progress, and commitment to learning.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Complete at least 3 worlds in the academy curriculum
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Maintain an active learning streak for 30+ consecutive days
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Demonstrate financial need and commitment to using AI tools
                    for education or career development
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Submit a brief application explaining how CaffeineAI will
                    support your learning journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Partners Section */}
        <div className="space-y-6">
          <div className="border border-secondary/20 rounded-lg p-8 bg-secondary/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1 space-y-4">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Become a Corporate Partner
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We invite forward-thinking organizations to join us in making
                  a lasting impact on global education. As a corporate sponsor,
                  your company can directly support student access to AI-powered
                  learning tools and help shape the next generation of digital
                  innovators.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Sponsor Subscriptions:
                      </strong>{" "}
                      Fund CaffeineAI subscriptions for students in need
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Brand Recognition:
                      </strong>{" "}
                      Showcase your commitment to education and social impact
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Impact Reports:
                      </strong>{" "}
                      Receive regular updates on the students you're supporting
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Talent Pipeline:
                      </strong>{" "}
                      Connect with motivated learners for future opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Application Form */}
          <div className="border border-border rounded-lg p-8 bg-card/50">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Partnership Application
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="partnerName">Contact Name *</Label>
                  <Input
                    id="partnerName"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Corporation"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Location *</Label>
                  <Input
                    id="companyAddress"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    placeholder="City, Country"
                    required
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell Us About Your Interest *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your vision for supporting education and how you'd like to partner with us..."
                  rows={5}
                  required
                  className="bg-background border-border resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto shadow-glow-sm hover:shadow-glow-md transition-shadow"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Building2 className="mr-2 h-4 w-4" />
                    Submit Partnership Application
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border border-primary/20 rounded-lg p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
            Together, We Can Make a Difference
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Whether you're a student seeking support or an organization ready to
            invest in the future, we invite you to join our mission to
            democratize access to AI-powered education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="shadow-glow-sm hover:shadow-glow-md"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Apply for Scholarship
            </Button>
            <Button variant="outline" size="lg">
              <Building2 className="mr-2 h-5 w-5" />
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

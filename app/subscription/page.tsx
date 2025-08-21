"use client"
import { ProtectedRoute } from "@/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, Check, Zap } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for getting started with AI fitness",
    features: [
      "AI-powered workout routines",
      "Basic progress tracking", 
      "Fitness calculators (BMI, BMR, 1RM)",
      "Chat with Maxx AI coach",
      "Mobile responsive design"
    ],
    popular: false,
    paypalPlanId: "P-basic-plan-id",
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "Advanced features for serious fitness enthusiasts",
    features: [
      "Everything in Basic",
      "Advanced analytics dashboard",
      "Workout heatmap visualization",
      "Nutrition tracking and charts",
      "Performance metrics tracking",
      "Data export functionality",
      "Priority AI responses"
    ],
    popular: true,
    paypalPlanId: "P-premium-plan-id",
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "Complete fitness ecosystem for professionals",
    features: [
      "Everything in Premium",
      "Unlimited AI workout generation",
      "Custom nutrition plan creation",
      "Advanced goal setting system",
      "Multi-language support",
      "API access for integrations",
      "White-label options"
    ],
    popular: false,
    paypalPlanId: "P-pro-plan-id",
  },
]

export default function SubscriptionPage() {
  const handleGetStarted = (plan: typeof plans[0]) => {
    localStorage.setItem('selectedPlan', JSON.stringify(plan))
    window.location.href = '/payment'
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              💎 Subscription Plans
            </h1>
            <p className="text-muted-foreground mt-2">Upgrade your HealthMaxxing experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-border/50 hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-serif font-black">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "glow-primary" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleGetStarted(plan)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">All plans include:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Secure PayPal payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Regular feature updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
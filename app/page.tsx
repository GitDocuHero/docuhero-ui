import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ShieldCheckIcon,
  FileTextIcon,
  UsersIcon,
  LockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon
} from 'lucide-react'
import { SimpleWaitlistForm } from '@/components/waitlist/SimpleWaitlistForm'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">DocuHero</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* PROMINENT Waitlist Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <SparklesIcon className="h-5 w-5 mr-2" />
                <span className="text-base font-semibold">Join the Early Access Waitlist</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Future of Healthcare
              <br />
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Documentation is Here
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-3xl mx-auto font-light">
              HIPAA-compliant and built for healthcare professionals
            </p>

            {/* Waitlist Form - Front and Center */}
            <div className="max-w-xl mx-auto">
              <Card className="bg-white text-gray-900 p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">
                  Get Early Access
                </h2>
                <SimpleWaitlistForm variant="compact" />
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-blue-100">HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-blue-100">Ohio DD Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original Hero Section - Now Secondary */}
      <main className="container mx-auto px-4">
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            HIPAA-Compliant Healthcare
            <br />
            <span className="text-primary">Documentation Platform</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Secure, intelligent healthcare documentation with AI assistance, blockchain integrity,
            and enterprise-grade compliance. Built for healthcare providers, agencies, and patients.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
              SOC 2 Certified
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
              AES-256 Encryption
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
              Blockchain Verified
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built for Healthcare Excellence
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileTextIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Documentation</CardTitle>
                <CardDescription>
                  AI-powered forms, voice-to-text, and intelligent compliance checking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <UsersIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Multi-Role Access</CardTitle>
                <CardDescription>
                  Secure access for agencies, providers, guardians, and clients with role-based permissions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <LockIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  End-to-end encryption, audit trails, and compliance reporting built-in
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* User Types Section */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Account Type
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="text-lg">Healthcare Agency</CardTitle>
                <CardDescription>
                  Manage multiple providers and clients with full organizational oversight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Multi-provider management</li>
                  <li>• Client portfolio oversight</li>
                  <li>• Compliance reporting</li>
                  <li>• Billing integration</li>
                </ul>
                <Link href="/signup/agency">
                  <Button className="w-full group-hover:bg-primary/90">
                    Register as Agency
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="text-lg">Healthcare Provider</CardTitle>
                <CardDescription>
                  Create and manage documentation for your assigned clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Client documentation</li>
                  <li>• Voice-enabled notes</li>
                  <li>• Progress tracking</li>
                  <li>• Mobile access</li>
                </ul>
                <Link href="/signup?role=provider">
                  <Button className="w-full group-hover:bg-primary/90">
                    Register as Provider
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="text-lg">Client/Guardian</CardTitle>
                <CardDescription>
                  View and track health records and care plan progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Care plan viewing</li>
                  <li>• Progress updates</li>
                  <li>• Secure messaging</li>
                  <li>• Document access</li>
                </ul>
                <Link href="/signup?role=client">
                  <Button className="w-full group-hover:bg-primary/90">
                    Register as Client
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sign In Section */}
        <div className="py-20 text-center bg-gray-50 rounded-2xl my-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Already Have an Account?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign in to access your secure DocuHero dashboard
          </p>
          <Link href="/signin">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Sign In Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Security Features */}
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Security
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Your healthcare data is protected by military-grade encryption and comprehensive audit trails
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <LockIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AES-256 Encryption</h3>
              <p className="text-sm text-gray-600">All data encrypted at rest and in transit</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-gray-600">Full compliance with healthcare regulations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileTextIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Audit Trails</h3>
              <p className="text-sm text-gray-600">Complete activity logging and reporting</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UsersIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Role-Based Access</h3>
              <p className="text-sm text-gray-600">Granular permissions and access control</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <ShieldCheckIcon className="h-6 w-6" />
            <span className="text-xl font-bold">DocuHero</span>
          </div>
          <p className="text-gray-400 mb-6">
            Secure healthcare documentation platform built for the modern healthcare ecosystem
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/compliance" className="hover:text-white">HIPAA Compliance</Link>
            <Link href="/support" className="hover:text-white">Support</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 DocuHero. All rights reserved. HIPAA-compliant healthcare documentation platform.
          </div>
        </div>
      </footer>
    </div>
  )
}
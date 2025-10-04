import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and elegant design perfect for corporate positions and formal industries",
    preview: "Traditional single-column layout with clear sections"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary two-column layout ideal for creative and tech professionals",
    preview: "Eye-catching design with sidebar for skills and contact info"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and sophisticated design that highlights your experience beautifully",
    preview: "Clean lines and plenty of white space for easy reading"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium template designed for senior positions and leadership roles",
    preview: "Bold headers and strategic use of color to command attention"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Choose Your Template</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Select a Template to Get Started
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pick a professionally designed template that matches your style and industry. 
              You can customize everything later.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 gap-6 pt-8">
            {templates.map((template, index) => (
              <Card 
                key={template.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-premium border-2 hover:border-primary/50 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/editor/${template.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {template.description}
                      </CardDescription>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground italic">
                        {template.preview}
                      </p>
                    </div>
                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      Use This Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

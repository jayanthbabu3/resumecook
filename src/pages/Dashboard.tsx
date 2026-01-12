import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import {
  professionCategories,
} from "@/constants/professionCategories";
import { templateMetaMap } from "@/constants/templateMeta";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Elegant Header */}
      <div className="border-b border-border/30 bg-gradient-to-br from-muted/5 via-muted/10 to-muted/5">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                Resume Templates
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              Choose your profession to find the perfect template for your career
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Quick Actions Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Create from Scratch Card */}
              <Card
                className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
                onClick={() => navigate("/builder/scratch")}
              >
                <div className="relative p-6">
                  {/* Icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-primary to-primary/80">
                    <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      Create from Scratch
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      Build your resume with drag-and-drop sections
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Card>

              {/* Browse All Templates Card */}
              {(() => {
                const allCategory = professionCategories.find((cat) => cat.isAll);
                if (!allCategory) return null;
                const IconComponent = allCategory.icon;

                return (
                  <Card
                    key={allCategory.id}
                    className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
                    onClick={() => navigate(`/dashboard/${allCategory.id}`)}
                  >
                    <div className="relative p-6">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${allCategory.gradientFrom} 0%, ${allCategory.gradientTo} 100%)`,
                        }}
                      >
                        <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {allCategory.name}
                          </h3>
                          <span
                            className="text-xs font-semibold px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: `${allCategory.color}15`,
                              color: allCategory.color,
                            }}
                          >
                            {allCategory.templateIds.filter((id) => templateMetaMap[id]?.name).length}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {allCategory.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Card>
                );
              })()}
          </div>
        </div>

        {/* Profession Categories Grid */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Browse by Profession</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {professionCategories
              .filter((category) => !category.isAll)
              .map((category) => {
                const IconComponent = category.icon;

                return (
                  <Card
                    key={category.id}
                    className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
                    onClick={() => navigate(`/dashboard/${category.id}`)}
                  >
                      <div className="relative p-6">
                        {/* Icon */}
                        <div
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 100%)`,
                          }}
                        >
                          <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white" />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {category.description}
                          </p>

                          {/* Template Count Badge */}
                          <div className="flex items-center justify-between pt-3">
                            <span
                              className="text-xs font-semibold px-3 py-1.5 rounded-full"
                              style={{
                                backgroundColor: `${category.color}15`,
                                color: category.color,
                              }}
                            >
                              {category.templateIds.filter((id) => templateMetaMap[id]?.name).length} templates
                            </span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

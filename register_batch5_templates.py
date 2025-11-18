#!/usr/bin/env python3
"""
Generate registration code for Batch 5 templates
"""

# Same template list from batch 5
TEMPLATES_BATCH_5 = [
    # Universal Professional with Social (20)
    {"id": "digital-professional", "name": "DigitalProfessional", "category": "universal-professional"},
    {"id": "networked-executive", "name": "NetworkedExecutive", "category": "universal-professional"},
    {"id": "connected-professional", "name": "ConnectedProfessional", "category": "universal-professional"},
    {"id": "linkedin-optimized", "name": "LinkedinOptimized", "category": "universal-professional"},
    {"id": "social-executive", "name": "SocialExecutive", "category": "universal-professional"},
    {"id": "online-professional", "name": "OnlineProfessional", "category": "universal-professional"},
    {"id": "webpresence-executive", "name": "WebpresenceExecutive", "category": "universal-professional"},
    {"id": "profile-centric", "name": "ProfileCentric", "category": "universal-professional"},
    {"id": "global-networker", "name": "GlobalNetworker", "category": "universal-professional"},
    {"id": "modern-digital", "name": "ModernDigital", "category": "universal-professional"},
    {"id": "social-savvy", "name": "SocialSavvy", "category": "universal-professional"},
    {"id": "platform-professional", "name": "PlatformProfessional", "category": "universal-professional"},
    {"id": "digital-executive", "name": "DigitalExecutive", "category": "universal-professional"},
    {"id": "branded-professional", "name": "BrandedProfessional", "category": "universal-professional"},
    {"id": "influencer-professional", "name": "InfluencerProfessional", "category": "universal-professional"},
    {"id": "online-identity", "name": "OnlineIdentity", "category": "universal-professional"},
    {"id": "portfolio-professional", "name": "PortfolioProfessional", "category": "universal-professional"},
    {"id": "digital-identity", "name": "DigitalIdentity", "category": "universal-professional"},
    {"id": "social-media-pro", "name": "SocialMediaPro", "category": "universal-professional"},
    {"id": "connected-leader", "name": "ConnectedLeader", "category": "universal-professional"},

    # Software/Tech with GitHub (20)
    {"id": "github-portfolio-dev", "name": "GithubPortfolioDev", "category": "software-technology"},
    {"id": "opensource-developer", "name": "OpensourceDeveloper", "category": "software-technology"},
    {"id": "stackoverflow-dev", "name": "StackoverflowDev", "category": "software-technology"},
    {"id": "codepen-developer", "name": "CodepenDeveloper", "category": "software-technology"},
    {"id": "portfolio-coder", "name": "PortfolioCoder", "category": "software-technology"},
    {"id": "tech-blogger-dev", "name": "TechBloggerDev", "category": "software-technology"},
    {"id": "youtube-dev-educator", "name": "YoutubeDevEducator", "category": "software-technology"},
    {"id": "linkedin-tech-expert", "name": "LinkedinTechExpert", "category": "software-technology"},
    {"id": "twitter-dev", "name": "TwitterDev", "category": "software-technology"},
    {"id": "medium-tech-writer", "name": "MediumTechWriter", "category": "software-technology"},
    {"id": "devto-contributor", "name": "DevtoContributor", "category": "software-technology"},
    {"id": "hackernews-developer", "name": "HackernewsDeveloper", "category": "software-technology"},
    {"id": "gitlab-developer", "name": "GitlabDeveloper", "category": "software-technology"},
    {"id": "bitbucket-developer", "name": "BitbucketDeveloper", "category": "software-technology"},
    {"id": "npm-package-author", "name": "NpmPackageAuthor", "category": "software-technology"},
    {"id": "pypi-contributor", "name": "PypiContributor", "category": "software-technology"},
    {"id": "dockerhub-publisher", "name": "DockerhubPublisher", "category": "software-technology"},
    {"id": "kaggle-data-scientist", "name": "KaggleDataScientist", "category": "software-technology"},
    {"id": "leetcode-champion", "name": "LeetcodeChampion", "category": "software-technology"},
    {"id": "hackerrank-expert", "name": "HackerrankExpert", "category": "software-technology"},

    # Fresh Graduates with Social (20)
    {"id": "gen-z-graduate", "name": "GenZGraduate", "category": "fresh-graduates"},
    {"id": "digital-native-grad", "name": "DigitalNativeGrad", "category": "fresh-graduates"},
    {"id": "social-first-fresher", "name": "SocialFirstFresher", "category": "fresh-graduates"},
    {"id": "portfolio-graduate", "name": "PortfolioGraduate", "category": "fresh-graduates"},
    {"id": "project-showcase-grad", "name": "ProjectShowcaseGrad", "category": "fresh-graduates"},
    {"id": "github-student", "name": "GithubStudent", "category": "fresh-graduates"},
    {"id": "linkedin-graduate", "name": "LinkedinGraduate", "category": "fresh-graduates"},
    {"id": "online-portfolio-fresher", "name": "OnlinePortfolioFresher", "category": "fresh-graduates"},
    {"id": "social-graduate", "name": "SocialGraduate", "category": "fresh-graduates"},
    {"id": "digital-graduate", "name": "DigitalGraduate", "category": "fresh-graduates"},
    {"id": "web-portfolio-grad", "name": "WebPortfolioGrad", "category": "fresh-graduates"},
    {"id": "hackathon-graduate", "name": "HackathonGraduate", "category": "fresh-graduates"},
    {"id": "bootcamp-portfolio", "name": "BootcampPortfolio", "category": "fresh-graduates"},
    {"id": "internship-showcase", "name": "InternshipShowcase", "category": "fresh-graduates"},
    {"id": "campus-influencer", "name": "CampusInfluencer", "category": "fresh-graduates"},
    {"id": "student-developer-portfolio", "name": "StudentDeveloperPortfolio", "category": "fresh-graduates"},
    {"id": "digital-portfolio-grad", "name": "DigitalPortfolioGrad", "category": "fresh-graduates"},
    {"id": "online-presence-fresher", "name": "OnlinePresenceFresher", "category": "fresh-graduates"},
    {"id": "networked-graduate", "name": "NetworkedGraduate", "category": "fresh-graduates"},
    {"id": "profile-driven-grad", "name": "ProfileDrivenGrad", "category": "fresh-graduates"},

    # Creative with Portfolio (20)
    {"id": "behance-portfolio", "name": "BehancePortfolio", "category": "creative-design"},
    {"id": "dribbble-showcase", "name": "DribbbleShowcase", "category": "creative-design"},
    {"id": "artstation-pro", "name": "ArtstationPro", "category": "creative-design"},
    {"id": "instagram-creative", "name": "InstagramCreative", "category": "creative-design"},
    {"id": "pinterest-designer", "name": "PinterestDesigner", "category": "creative-design"},
    {"id": "youtube-creator", "name": "YoutubeCreator", "category": "creative-design"},
    {"id": "tiktok-content-creator", "name": "TiktokContentCreator", "category": "creative-design"},
    {"id": "vimeo-videographer", "name": "VimeoVideographer", "category": "creative-design"},
    {"id": "soundcloud-artist", "name": "SoundcloudArtist", "category": "creative-design"},
    {"id": "spotify-musician", "name": "SpotifyMusician", "category": "creative-design"},
    {"id": "twitch-streamer-creative", "name": "TwitchStreamerCreative", "category": "creative-design"},
    {"id": "deviantart-artist", "name": "DeviantartArtist", "category": "creative-design"},
    {"id": "patreon-creative", "name": "PatreonCreative", "category": "creative-design"},
    {"id": "medium-writer-creative", "name": "MediumWriterCreative", "category": "creative-design"},
    {"id": "substack-author", "name": "SubstackAuthor", "category": "creative-design"},
    {"id": "portfolio-website-creative", "name": "PortfolioWebsiteCreative", "category": "creative-design"},
    {"id": "online-gallery-artist", "name": "OnlineGalleryArtist", "category": "creative-design"},
    {"id": "social-creative-influencer", "name": "SocialCreativeInfluencer", "category": "creative-design"},
    {"id": "multi-platform-artist", "name": "MultiPlatformArtist", "category": "creative-design"},
    {"id": "digital-artist-portfolio", "name": "DigitalArtistPortfolio", "category": "creative-design"},

    # Design/UX with Portfolio (20)
    {"id": "figma-designer-portfolio", "name": "FigmaDesignerPortfolio", "category": "creative-design"},
    {"id": "adobe-portfolio-designer", "name": "AdobePortfolioDesigner", "category": "creative-design"},
    {"id": "sketch-expert-portfolio", "name": "SketchExpertPortfolio", "category": "creative-design"},
    {"id": "webflow-designer-portfolio", "name": "WebflowDesignerPortfolio", "category": "creative-design"},
    {"id": "framer-designer-portfolio", "name": "FramerDesignerPortfolio", "category": "creative-design"},
    {"id": "uxfolio-designer", "name": "UxfolioDesigner", "category": "creative-design"},
    {"id": "coroflot-portfolio", "name": "CoroflotPortfolio", "category": "creative-design"},
    {"id": "carbonmade-designer", "name": "CarbonmadeDesigner", "category": "creative-design"},
    {"id": "awwwards-designer", "name": "AwwwardsDesigner", "category": "creative-design"},
    {"id": "uiux-portfolio-pro", "name": "UiuxPortfolioPro", "category": "creative-design"},
    {"id": "designportfolio-specialist", "name": "DesignportfolioSpecialist", "category": "creative-design"},
    {"id": "casestudy-designer", "name": "CasestudyDesigner", "category": "creative-design"},
    {"id": "protfolio-showcase-ux", "name": "ProtfolioShowcaseUx", "category": "creative-design"},
    {"id": "interactive-portfolio-designer", "name": "InteractivePortfolioDesigner", "category": "creative-design"},
    {"id": "ux-researcher-portfolio", "name": "UxResearcherPortfolio", "category": "creative-design"},
    {"id": "product-designer-showcase", "name": "ProductDesignerShowcase", "category": "creative-design"},
    {"id": "design-systems-portfolio", "name": "DesignSystemsPortfolio", "category": "creative-design"},
    {"id": "motion-designer-portfolio", "name": "MotionDesignerPortfolio", "category": "creative-design"},
    {"id": "visual-designer-showcase", "name": "VisualDesignerShowcase", "category": "creative-design"},
    {"id": "design-leader-portfolio", "name": "DesignLeaderPortfolio", "category": "creative-design"},
]


def generate_ui_imports():
    imports = []
    for template in TEMPLATES_BATCH_5:
        imports.append(f'import {{ {template["name"]}Template }} from "@/components/resume/templates/{template["name"]}Template";')
    return "\n".join(imports)


def generate_pdf_imports():
    imports = []
    for template in TEMPLATES_BATCH_5:
        imports.append(f'import {{ PDF{template["name"]}Template }} from "@/components/resume/pdf/PDF{template["name"]}Template";')
    return "\n".join(imports)


def generate_template_defaults():
    cases = []
    for template in TEMPLATES_BATCH_5:
        cases.append(f'''    case "{template["id"]}":
      return {{
        ...defaultData,
        template: "{template["id"]}",
      }};''')
    return "\n".join(cases)


def generate_pdf_templates():
    entries = []
    for template in TEMPLATES_BATCH_5:
        entries.append(f'  "{template["id"]}": PDF{template["name"]}Template,')
    return "\n".join(entries)


def generate_profession_categories():
    by_category = {}
    for template in TEMPLATES_BATCH_5:
        category = template["category"]
        if category not in by_category:
            by_category[category] = []
        by_category[category].append(template["id"])

    output = []
    output.append("// ===== BATCH 5 SOCIAL LINKS TEMPLATES (100 templates) =====\n")

    for category, template_ids in by_category.items():
        output.append(f"// {category.upper()} ({len(template_ids)} templates)")
        for template_id in template_ids:
            output.append(f'      "{template_id}",')
        output.append("")

    return "\n".join(output)


def main():
    print("=" * 80)
    print("GENERATING REGISTRATION CODE FOR BATCH 5 TEMPLATES")
    print("=" * 80)
    print()

    with open("batch5_ui_imports.txt", "w") as f:
        f.write(generate_ui_imports())
    print("✓ Generated UI imports → batch5_ui_imports.txt")

    with open("batch5_pdf_imports.txt", "w") as f:
        f.write(generate_pdf_imports())
    print("✓ Generated PDF imports → batch5_pdf_imports.txt")

    with open("batch5_template_defaults.txt", "w") as f:
        f.write(generate_template_defaults())
    print("✓ Generated template defaults → batch5_template_defaults.txt")

    with open("batch5_pdf_templates.txt", "w") as f:
        f.write(generate_pdf_templates())
    print("✓ Generated PDF template mappings → batch5_pdf_templates.txt")

    with open("batch5_profession_categories.txt", "w") as f:
        f.write(generate_profession_categories())
    print("✓ Generated profession categories → batch5_profession_categories.txt")

    print()
    print("=" * 80)
    print("✅ Registration code generated!")
    print("=" * 80)


if __name__ == "__main__":
    main()

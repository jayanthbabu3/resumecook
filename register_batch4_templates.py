#!/usr/bin/env python3
"""
Generate registration code for Batch 4 templates to be added to Editor.tsx
"""

# Same template list from batch 4
TEMPLATES_BATCH_4 = [
    # ===== UNIVERSAL PROFESSIONAL (20 templates) =====
    {"id": "crystal-executive", "name": "CrystalExecutive", "category": "universal-professional"},
    {"id": "quantum-professional", "name": "QuantumProfessional", "category": "universal-professional"},
    {"id": "zenith-corporate", "name": "ZenithCorporate", "category": "universal-professional"},
    {"id": "aurora-minimal", "name": "AuroraMinimal", "category": "universal-professional"},
    {"id": "nexus-elite", "name": "NexusElite", "category": "universal-professional"},
    {"id": "harmony-executive", "name": "HarmonyExecutive", "category": "universal-professional"},
    {"id": "prism-professional", "name": "PrismProfessional", "category": "universal-professional"},
    {"id": "titan-corporate", "name": "TitanCorporate", "category": "universal-professional"},
    {"id": "serenity-minimal", "name": "SerenityMinimal", "category": "universal-professional"},
    {"id": "velocity-executive", "name": "VelocityExecutive", "category": "universal-professional"},
    {"id": "eclipse-professional", "name": "EclipseProfessional", "category": "universal-professional"},
    {"id": "sterling-executive", "name": "SterlingExecutive", "category": "universal-professional"},
    {"id": "meridian-corporate", "name": "MeridianCorporate", "category": "universal-professional"},
    {"id": "cosmos-professional", "name": "CosmosProfessional", "category": "universal-professional"},
    {"id": "pinnacle-elite", "name": "PinnacleElite", "category": "universal-professional"},
    {"id": "flux-executive", "name": "FluxExecutive", "category": "universal-professional"},
    {"id": "vertex-professional", "name": "VertexProfessional", "category": "universal-professional"},
    {"id": "radiance-corporate", "name": "RadianceCorporate", "category": "universal-professional"},
    {"id": "atlas-executive", "name": "AtlasExecutive", "category": "universal-professional"},
    {"id": "spectrum-professional", "name": "SpectrumProfessional", "category": "universal-professional"},

    # ===== SOFTWARE & TECHNOLOGY (20 templates) =====
    {"id": "codeforge-developer", "name": "CodeforgeDeveloper", "category": "software-technology"},
    {"id": "quantum-coder", "name": "QuantumCoder", "category": "software-technology"},
    {"id": "neural-engineer", "name": "NeuralEngineer", "category": "software-technology"},
    {"id": "pixelcraft-developer", "name": "PixelcraftDeveloper", "category": "software-technology"},
    {"id": "cloudnative-architect", "name": "CloudnativeArchitect", "category": "software-technology"},
    {"id": "bytecode-specialist", "name": "BytecodeSpecialist", "category": "software-technology"},
    {"id": "agileflow-developer", "name": "AgileflowDeveloper", "category": "software-technology"},
    {"id": "stackmaster-fullstack", "name": "StackmasterFullstack", "category": "software-technology"},
    {"id": "gitflow-engineer", "name": "GitflowEngineer", "category": "software-technology"},
    {"id": "compile-time-dev", "name": "CompileTimeDev", "category": "software-technology"},
    {"id": "microarch-engineer", "name": "MicroarchEngineer", "category": "software-technology"},
    {"id": "serverless-specialist", "name": "ServerlessSpecialist", "category": "software-technology"},
    {"id": "edgecompute-developer", "name": "EdgecomputeDeveloper", "category": "software-technology"},
    {"id": "webrtc-engineer", "name": "WebrtcEngineer", "category": "software-technology"},
    {"id": "graphdb-specialist", "name": "GraphdbSpecialist", "category": "software-technology"},
    {"id": "containerops-engineer", "name": "ContaineropsEngineer", "category": "software-technology"},
    {"id": "apigateway-architect", "name": "ApigatewayArchitect", "category": "software-technology"},
    {"id": "observability-engineer", "name": "ObservabilityEngineer", "category": "software-technology"},
    {"id": "eventdriven-architect", "name": "EventdrivenArchitect", "category": "software-technology"},
    {"id": "mlops-engineer", "name": "MlopsEngineer", "category": "software-technology"},

    # ===== FRESH GRADUATES (20 templates) =====
    {"id": "launchpad-graduate", "name": "LaunchpadGraduate", "category": "fresh-graduates"},
    {"id": "momentum-fresher", "name": "MomentumFresher", "category": "fresh-graduates"},
    {"id": "horizon-graduate", "name": "HorizonGraduate", "category": "fresh-graduates"},
    {"id": "catalyst-fresher", "name": "CatalystFresher", "category": "fresh-graduates"},
    {"id": "pathway-graduate", "name": "PathwayGraduate", "category": "fresh-graduates"},
    {"id": "spark-fresher", "name": "SparkFresher", "category": "fresh-graduates"},
    {"id": "ascend-graduate", "name": "AscendGraduate", "category": "fresh-graduates"},
    {"id": "pioneer-fresher", "name": "PioneerFresher", "category": "fresh-graduates"},
    {"id": "keystone-graduate", "name": "KeystoneGraduate", "category": "fresh-graduates"},
    {"id": "venture-fresher", "name": "VentureFresher", "category": "fresh-graduates"},
    {"id": "aspire-graduate", "name": "AspireGraduate", "category": "fresh-graduates"},
    {"id": "emerge-fresher", "name": "EmergeFresher", "category": "fresh-graduates"},
    {"id": "bright-graduate", "name": "BrightGraduate", "category": "fresh-graduates"},
    {"id": "nextstep-fresher", "name": "NextstepFresher", "category": "fresh-graduates"},
    {"id": "foundation-graduate", "name": "FoundationGraduate", "category": "fresh-graduates"},
    {"id": "elevate-fresher", "name": "ElevateFresher", "category": "fresh-graduates"},
    {"id": "genesis-graduate", "name": "GenesisGraduate", "category": "fresh-graduates"},
    {"id": "achiever-fresher", "name": "AchieverFresher", "category": "fresh-graduates"},
    {"id": "milestone-graduate", "name": "MilestoneGraduate", "category": "fresh-graduates"},
    {"id": "potential-fresher", "name": "PotentialFresher", "category": "fresh-graduates"},

    # ===== CREATIVE (20 templates) =====
    {"id": "muse-creative", "name": "MuseCreative", "category": "creative-design"},
    {"id": "canvas-artist", "name": "CanvasArtist", "category": "creative-design"},
    {"id": "palette-designer", "name": "PaletteDesigner", "category": "creative-design"},
    {"id": "visionary-creative", "name": "VisionaryCreative", "category": "creative-design"},
    {"id": "studio-artist", "name": "StudioArtist", "category": "creative-design"},
    {"id": "creative-pulse", "name": "CreativePulse", "category": "creative-design"},
    {"id": "artisan-designer", "name": "ArtisanDesigner", "category": "creative-design"},
    {"id": "chromatic-creative", "name": "ChromaticCreative", "category": "creative-design"},
    {"id": "expression-artist", "name": "ExpressionArtist", "category": "creative-design"},
    {"id": "imaginative-designer", "name": "ImaginativeDesigner", "category": "creative-design"},
    {"id": "aesthetic-creative", "name": "AestheticCreative", "category": "creative-design"},
    {"id": "composition-artist", "name": "CompositionArtist", "category": "creative-design"},
    {"id": "impression-designer", "name": "ImpressionDesigner", "category": "creative-design"},
    {"id": "narrative-creative", "name": "NarrativeCreative", "category": "creative-design"},
    {"id": "craft-artist", "name": "CraftArtist", "category": "creative-design"},
    {"id": "vibrant-designer", "name": "VibrantDesigner", "category": "creative-design"},
    {"id": "concept-creative", "name": "ConceptCreative", "category": "creative-design"},
    {"id": "editorial-artist", "name": "EditorialArtist", "category": "creative-design"},
    {"id": "vision-designer", "name": "VisionDesigner", "category": "creative-design"},
    {"id": "curator-creative", "name": "CuratorCreative", "category": "creative-design"},

    # ===== DESIGN (20 templates) =====
    {"id": "interface-master", "name": "InterfaceMaster", "category": "creative-design"},
    {"id": "designsystem-architect", "name": "DesignsystemArchitect", "category": "creative-design"},
    {"id": "userflow-designer", "name": "UserflowDesigner", "category": "creative-design"},
    {"id": "prototype-specialist", "name": "PrototypeSpecialist", "category": "creative-design"},
    {"id": "pixelperfect-designer", "name": "PixelperfectDesigner", "category": "creative-design"},
    {"id": "responsive-ux", "name": "ResponsiveUx", "category": "creative-design"},
    {"id": "wireframe-specialist", "name": "WireframeSpecialist", "category": "creative-design"},
    {"id": "microinteraction-designer", "name": "MicrointeractionDesigner", "category": "creative-design"},
    {"id": "accessibility-ux", "name": "AccessibilityUx", "category": "creative-design"},
    {"id": "userresearch-specialist", "name": "UserresearchSpecialist", "category": "creative-design"},
    {"id": "information-architect", "name": "InformationArchitect", "category": "creative-design"},
    {"id": "designthinking-specialist", "name": "DesignthinkingSpecialist", "category": "creative-design"},
    {"id": "componentui-designer", "name": "ComponentuiDesigner", "category": "creative-design"},
    {"id": "designops-specialist", "name": "DesignopsSpecialist", "category": "creative-design"},
    {"id": "mobile-first-designer", "name": "MobileFirstDesigner", "category": "creative-design"},
    {"id": "servicedesign-specialist", "name": "ServicedesignSpecialist", "category": "creative-design"},
    {"id": "designstrategy-lead", "name": "DesignstrategyLead", "category": "creative-design"},
    {"id": "conversational-ux", "name": "ConversationalUx", "category": "creative-design"},
    {"id": "motion-ui-designer", "name": "MotionUiDesigner", "category": "creative-design"},
    {"id": "designleadership-director", "name": "DesignleadershipDirector", "category": "creative-design"},
]


def generate_ui_imports():
    """Generate UI template imports"""
    imports = []
    for template in TEMPLATES_BATCH_4:
        imports.append(f'import {{ {template["name"]}Template }} from "@/components/resume/templates/{template["name"]}Template";')
    return "\n".join(imports)


def generate_pdf_imports():
    """Generate PDF template imports"""
    imports = []
    for template in TEMPLATES_BATCH_4:
        imports.append(f'import {{ PDF{template["name"]}Template }} from "@/components/resume/pdf/PDF{template["name"]}Template";')
    return "\n".join(imports)


def generate_template_defaults():
    """Generate getTemplateDefaults cases"""
    cases = []
    for template in TEMPLATES_BATCH_4:
        cases.append(f'''    case "{template["id"]}":
      return {{
        ...defaultData,
        template: "{template["id"]}",
      }};''')
    return "\n".join(cases)


def generate_pdf_templates():
    """Generate pdfTemplates object entries"""
    entries = []
    for template in TEMPLATES_BATCH_4:
        entries.append(f'  "{template["id"]}": PDF{template["name"]}Template,')
    return "\n".join(entries)


def generate_profession_categories():
    """Generate professionCategories.ts template IDs"""
    by_category = {}
    for template in TEMPLATES_BATCH_4:
        category = template["category"]
        if category not in by_category:
            by_category[category] = []
        by_category[category].append(template["id"])

    output = []
    output.append("// ===== BATCH 4 NEW TEMPLATES (100 templates) =====\n")

    for category, template_ids in by_category.items():
        output.append(f"// {category.upper()} ({len(template_ids)} templates)")
        for template_id in template_ids:
            output.append(f'      "{template_id}",')
        output.append("")

    return "\n".join(output)


def main():
    print("=" * 80)
    print("GENERATING REGISTRATION CODE FOR BATCH 4 TEMPLATES")
    print("=" * 80)
    print()

    # Generate files
    with open("batch4_ui_imports.txt", "w") as f:
        f.write(generate_ui_imports())
    print("✓ Generated UI imports → batch4_ui_imports.txt")

    with open("batch4_pdf_imports.txt", "w") as f:
        f.write(generate_pdf_imports())
    print("✓ Generated PDF imports → batch4_pdf_imports.txt")

    with open("batch4_template_defaults.txt", "w") as f:
        f.write(generate_template_defaults())
    print("✓ Generated template defaults → batch4_template_defaults.txt")

    with open("batch4_pdf_templates.txt", "w") as f:
        f.write(generate_pdf_templates())
    print("✓ Generated PDF template mappings → batch4_pdf_templates.txt")

    with open("batch4_profession_categories.txt", "w") as f:
        f.write(generate_profession_categories())
    print("✓ Generated profession categories → batch4_profession_categories.txt")

    print()
    print("=" * 80)
    print("✅ Registration code generated successfully!")
    print("=" * 80)
    print()
    print("SUMMARY:")
    print("  - 100 UI template imports")
    print("  - 100 PDF template imports")
    print("  - 100 template default cases")
    print("  - 100 PDF template mappings")
    print("  - Template IDs organized by category")
    print()
    print("NEXT STEPS:")
    print("  1. Add UI imports to Editor.tsx (near line 50)")
    print("  2. Add PDF imports to Editor.tsx (after UI imports)")
    print("  3. Add template defaults to getTemplateDefaults() function")
    print("  4. Add PDF template mappings to pdfTemplates object")
    print("  5. Add template IDs to professionCategories.ts")
    print()


if __name__ == "__main__":
    main()

/**
 * Internationalization (i18n) System for Assembly SOP Generator
 * Supports English, German, and French
 */

class I18nManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.loadTranslations();
        this.initializeLanguage();
    }

    /**
     * Load all translation data
     */
    loadTranslations() {
        this.translations = {
            en: {
                // Header and Navigation
                appTitle: "Assembly SOP Generator",
                appSubtitle: "Streamline your Standard Operating Procedures",
                navDatabase: "Database",
                navBasicInfo: "Basic Info",
                navBOM: "BOM",
                navSafety: "Safety",
                navAssembly: "Assembly",
                navPreview: "Preview",
                navCompany: "⚙️ Company",

                // Progress
                progressStep: "Step",
                progressOf: "of",

                // Database Section
                databaseTitle: "Manage Your Database",
                databaseDescription: "Add items to your database once, reuse across multiple SOPs",
                safetyDatabase: "Safety Database",
                toolsDatabase: "Tools Database",
                fixturesDatabase: "Fixtures Database",
                addSafetyItem: "Add Safety Item",
                addTool: "Add Tool",
                addFixture: "Add Fixture",
                addNewPart: "Add New Part",
                databaseNote: "The Database section is separate from the main SOP creation flow. Use it to manage reusable items across multiple SOPs.",

                // Test Data
                testDataGeneration: "🎭 Test Data Generation",
                testDataDescription: "Generate realistic test data to explore the application functionality",
                generateFullTestData: "🎯 Generate Full Test Data",
                clearAllData: "🗑️ Clear All Data",

                // Basic Info Section
                basicInfoTitle: "Basic Information",
                basicInfoDescription: "Enter the fundamental details for your SOP document",
                sopTitle: "SOP Title",
                sopTitlePlaceholder: "Enter the SOP title (e.g., 'Widget Assembly Process')",
                sopTitleHelp: "A clear, descriptive title for this Standard Operating Procedure",
                partNumber: "Part Number",
                partNumberPlaceholder: "Enter part number (e.g., 'WDG-001-A')",
                partNumberHelp: "Unique identifier for the part or assembly",
                revision: "Revision",
                revisionHelp: "Document revision level (e.g., A, B, C or 1.0, 1.1)",
                author: "Author",
                authorPlaceholder: "Enter author name",
                authorHelp: "Person responsible for creating this SOP",
                department: "Department",
                departmentPlaceholder: "Enter department (e.g., 'Manufacturing', 'Assembly')",
                departmentHelp: "Department or team responsible for this process",
                approver: "Approver",
                approverPlaceholder: "Enter approver name",
                approverHelp: "Person who approved this SOP for use",
                effectiveDate: "Effective Date",
                effectiveDateHelp: "Date when this SOP becomes effective",
                generalNotes: "General Notes",
                generalNotesPlaceholder: "Enter any general notes, special instructions, or additional information about this SOP...",
                generalNotesHelp: "Optional notes or special instructions for this SOP",

                // BOM Section
                bomTitle: "Bill of Materials",
                bomDescription: "Define all parts and components needed for this assembly",
                availableParts: "Available Parts",
                addBOMItem: "Add BOM Item",

                // Safety Section
                safetyTitle: "Safety Requirements",
                safetyDescription: "Define general safety precautions and requirements for this SOP",
                generalSafetyNotes: "General Safety Notes",
                safetyNotesPlaceholder: "Describe general safety precautions for this assembly process...",
                addSafetyFromDatabase: "Add Safety Items from Database",
                selectSafetyItem: "Select safety item to add...",
                noSafetySelected: "No safety items selected yet",

                // Assembly Section
                assemblyTitle: "Assembly Sequence",
                assemblyDescription: "Document the step-by-step assembly process with tools, fixtures, parts, and safety for each step",
                addAssemblyStep: "Add Assembly Step",

                // Preview Section
                previewTitle: "Preview & Generate",
                previewDescription: "Review your SOP and generate the final document",
                previewSummary: "Review all sections and click \"Generate SOP\" to create your final document.",

                // Navigation Controls
                previous: "Previous",
                next: "Next",
                generateSOP: "Generate SOP",

                // Buttons and Actions
                cancel: "Cancel",
                confirm: "Confirm",
                save: "Save",
                edit: "Edit",
                delete: "Delete",
                remove: "Remove",
                add: "Add",
                close: "Close",

                // SOP Generation
                sopDocument: "Generated SOP Document",
                sopDocumentDescription: "Your complete Standard Operating Procedure",
                printSOP: "Print SOP",
                exportPDF: "Export PDF",
                editSOP: "Edit SOP",

                // Company Setup
                companySetup: "Company Setup",
                companyName: "Company Name",
                companyNamePlaceholder: "Enter your company name",
                companyLogo: "Company Logo",
                companyLogoHelp: "Upload your company logo (optional)",
                address: "Address",
                addressPlaceholder: "Enter company address",
                phone: "Phone",
                phonePlaceholder: "Enter phone number",
                email: "Email",
                emailPlaceholder: "Enter company email",
                website: "Website",
                websitePlaceholder: "Enter company website",

                // Form Labels
                required: "required",
                optional: "optional",

                // Messages
                loading: "Loading...",
                noImage: "No Image",
                clickToAddImage: "Click to add image",
                clickToChange: "Click to change",
                removeImage: "Remove",

                // Footer
                footerText: "Assembly SOP Generator",

                // Additional common text
                note: "Note:",
                skipToMainContent: "Skip to main content",
                selectLanguage: "Select language",

                // Form field labels
                sopTitleLabel: "SOP Title",
                partNumberLabel: "Part Number",
                revisionLabel: "Revision",
                authorLabel: "Author",
                departmentLabel: "Department",
                approverLabel: "Approver",
                effectiveDateLabel: "Effective Date",
                generalNotesLabel: "General Notes",
                availablePartsLabel: "Available Parts",
                generalSafetyNotesLabel: "General Safety Notes",

                // Section descriptions
                bomDescription: "Define all parts and components needed for this assembly",
                safetyDescriptionText: "Define general safety precautions and requirements for this SOP",
                assemblyDescriptionText: "Document the step-by-step assembly process with tools, fixtures, parts, and safety for each step",
                previewDescriptionText: "Review your SOP and generate the final document",

                // Preview text
                sopPreviewTitle: "SOP Preview",
                previewPlaceholder1: "Your SOP preview will appear here as you complete each section.",
                previewPlaceholder2: "Click \"Generate SOP\" to create the final document.",

                // Test data section
                testDataTitle: "Test Data Generation",
                testDataDesc: "Generate realistic test data to explore the application functionality",
                databaseNoteText: "The Database section is separate from the main SOP creation flow. Use it to manage reusable items across multiple SOPs.",

                // Modal titles
                addSafetyItem: "Add Safety Item",
                addTool: "Add Tool",
                addFixture: "Add Fixture",
                addBOMItem: "Add BOM Item",
                addAssemblyStep: "Add Assembly Step",

                // Form fields
                name: "Name",
                identifier: "Identifier",
                description: "Description",
                category: "Category",
                specifications: "Specifications",
                quantity: "Quantity",

                // Common placeholders
                enterName: "Enter name",
                enterIdentifier: "Enter identifier",
                enterDescription: "Enter description",
                selectCategory: "Select category...",

                // Safety specific
                safetyItemName: "Safety Item Name",
                severityLevel: "Severity Level",
                low: "Low",
                medium: "Medium",
                high: "High",
                critical: "Critical",

                // Tool specific
                toolName: "Tool Name",
                toolIdentifier: "Tool Identifier",
                sizeSpecification: "Size/Specification",
                additionalSpecifications: "Additional Specifications",

                // Fixture specific
                fixtureName: "Fixture Name",
                fixtureIdentifier: "Fixture Identifier",

                // Part specific
                partName: "Part Name",
                partNumber: "Part Number",
                manufacturer: "Manufacturer",

                // Assembly specific
                stepDescription: "Step Description",
                estimatedTime: "Estimated Time",
                minutes: "minutes",

                // Categories
                ppe: "Personal Protective Equipment",
                environmentalSafety: "Environmental Safety",
                equipmentSafety: "Equipment Safety",
                chemicalSafety: "Chemical Safety",
                fireSafety: "Fire Safety",
                medicalFirstAid: "Medical/First Aid",
                generalSafety: "General Safety",

                handTools: "Hand Tools",
                powerTools: "Power Tools",
                measuringTools: "Measuring Tools",
                cuttingTools: "Cutting Tools",
                assemblyTools: "Assembly Tools",
                testingEquipment: "Testing Equipment",
                generalTools: "General Tools",

                assemblyFixtures: "Assembly Fixtures",
                testingFixtures: "Testing Fixtures",
                holdingFixtures: "Holding Fixtures",
                alignmentFixtures: "Alignment Fixtures",
                weldingFixtures: "Welding Fixtures",
                inspectionFixtures: "Inspection Fixtures",
                generalFixtures: "General Fixtures",

                // Messages
                pleaseFillinRequired: "Please fill in all required fields",
                errorAdding: "Error adding",
                addedNew: "Added new",
                addNewPart: "Add New Part",
                pleaseProvideDescription: "Please provide a step description",

                // Assembly step specific
                stepImage: "Step Image",
                stepImageHelp: "Upload an image to illustrate this assembly step (optional)",
                partsUsed: "Parts Used",
                toolsRequired: "Tools Required",
                fixturesRequired: "Fixtures Required",
                safetyRequirements: "Safety Requirements",
                additionalSafetyNotes: "Additional Safety Notes",
                qualityCheckRequired: "Quality Check Required",
                qualityCheckDescription: "Quality Check Description",
                additionalNotes: "Additional Notes",
                multiSelectHelp: "Hold Ctrl/Cmd to select multiple items",

                // Assembly display
                noAssemblySteps: "No assembly steps defined yet",
                assemblyHelp: "Click \"Add Assembly Step\" to start documenting your assembly process",
                moveStepUp: "Move step up",
                moveStepDown: "Move step down",
                editStep: "Edit step",
                removeStep: "Remove step",
                clickToAddChangeImage: "Click to add/change image",
                clickToAddImage: "Click to add image",
                qualityCheck: "Quality Check",
                required: "Required",

                // SOP Generation
                assemblyProcedure: "ASSEMBLY PROCEDURE",
                noAssemblyStepsDefined: "No assembly steps defined",
                unknownPart: "Unknown part",
                unknownTool: "Unknown tool",
                unknownFixture: "Unknown fixture",
                toolsFixtures: "Tools/Fixtures",
                time: "Time",
                image: "Image",
                assemblyStep: "Assembly Step",
                noPartsSpecified: "No parts specified in BOM",
                general: "General",
                item: "Item",
                qty: "Qty",
                noSafetyRequirements: "No specific safety requirements defined. Follow general workplace safety guidelines.",
                warning: "WARNING",
                safetyWarning: "Ensure all safety requirements are met before beginning assembly.",

                // Additional SOP sections
                scope: "SCOPE",
                scopeDescription: "This Standard Operating Procedure describes the assembly process for the specified components. Follow all steps in sequence and adhere to safety requirements throughout the process."
            },

            de: {
                // Header and Navigation
                appTitle: "Montage-AA-Generator",
                appSubtitle: "Optimieren Sie Ihre Arbeitsanweisungen",
                navDatabase: "Datenbank",
                navBasicInfo: "Grundinfo",
                navBOM: "Stückliste",
                navSafety: "Sicherheit",
                navAssembly: "Montage",
                navPreview: "Vorschau",
                navCompany: "⚙️ Unternehmen",

                // Progress
                progressStep: "Schritt",
                progressOf: "von",

                // Database Section
                databaseTitle: "Datenbank verwalten",
                databaseDescription: "Fügen Sie Elemente einmal zur Datenbank hinzu und verwenden Sie sie in mehreren SOPs wieder",
                safetyDatabase: "Sicherheitsdatenbank",
                toolsDatabase: "Werkzeugdatenbank",
                fixturesDatabase: "Vorrichtungsdatenbank",
                addSafetyItem: "Sicherheitselement hinzufügen",
                addTool: "Werkzeug hinzufügen",
                addFixture: "Vorrichtung hinzufügen",
                addNewPart: "Neues Teil hinzufügen",
                databaseNote: "Der Datenbankbereich ist vom Haupt-SOP-Erstellungsablauf getrennt. Verwenden Sie ihn zur Verwaltung wiederverwendbarer Elemente in mehreren SOPs.",

                // Test Data
                testDataGeneration: "🎭 Testdatengenerierung",
                testDataDescription: "Generieren Sie realistische Testdaten zur Erkundung der Anwendungsfunktionalität",
                generateFullTestData: "🎯 Vollständige Testdaten generieren",
                clearAllData: "🗑️ Alle Daten löschen",

                // Basic Info Section
                basicInfoTitle: "Grundinformationen",
                basicInfoDescription: "Geben Sie die grundlegenden Details für Ihr AA-Dokument ein",
                sopTitle: "AA-Titel",
                sopTitlePlaceholder: "AA-Titel eingeben (z.B. 'Widget-Montageprozess')",
                sopTitleHelp: "Ein klarer, beschreibender Titel für diese Arbeitsanweisung",
                partNumber: "Teilenummer",
                partNumberPlaceholder: "Teilenummer eingeben (z.B. 'WDG-001-A')",
                partNumberHelp: "Eindeutige Kennung für das Teil oder die Baugruppe",
                revision: "Revision",
                revisionHelp: "Dokumentrevisionsstufe (z.B. A, B, C oder 1.0, 1.1)",
                author: "Autor",
                authorPlaceholder: "Autorennamen eingeben",
                authorHelp: "Person, die für die Erstellung dieser SOP verantwortlich ist",
                department: "Abteilung",
                departmentPlaceholder: "Abteilung eingeben (z.B. 'Fertigung', 'Montage')",
                departmentHelp: "Abteilung oder Team, das für diesen Prozess verantwortlich ist",
                approver: "Genehmiger",
                approverPlaceholder: "Namen des Genehmigers eingeben",
                approverHelp: "Person, die diese SOP zur Verwendung genehmigt hat",
                effectiveDate: "Gültigkeitsdatum",
                effectiveDateHelp: "Datum, an dem diese AA wirksam wird",
                generalNotes: "Allgemeine Hinweise",
                generalNotesPlaceholder: "Geben Sie allgemeine Hinweise, spezielle Anweisungen oder zusätzliche Informationen zu dieser AA ein...",
                generalNotesHelp: "Optionale Hinweise oder spezielle Anweisungen für diese AA",

                // BOM Section
                bomTitle: "Stückliste",
                bomDescription: "Definieren Sie alle Teile und Komponenten, die für diese Montage benötigt werden",
                availableParts: "Verfügbare Teile",
                addBOMItem: "Stücklistenelement hinzufügen",

                // Safety Section
                safetyTitle: "Sicherheitsanforderungen",
                safetyDescription: "Definieren Sie allgemeine Sicherheitsvorkehrungen und -anforderungen für diese AA",
                generalSafetyNotes: "Allgemeine Sicherheitshinweise",
                safetyNotesPlaceholder: "Beschreiben Sie allgemeine Sicherheitsvorkehrungen für diesen Montageprozess...",
                addSafetyFromDatabase: "Sicherheitselemente aus Datenbank hinzufügen",
                selectSafetyItem: "Sicherheitselement zum Hinzufügen auswählen...",
                noSafetySelected: "Noch keine Sicherheitselemente ausgewählt",

                // Assembly Section
                assemblyTitle: "Montagesequenz",
                assemblyDescription: "Dokumentieren Sie den schrittweisen Montageprozess mit Werkzeugen, Vorrichtungen, Teilen und Sicherheit für jeden Schritt",
                addAssemblyStep: "Montageschritt hinzufügen",

                // Preview Section
                previewTitle: "Vorschau & Generieren",
                previewDescription: "Überprüfen Sie Ihre AA und generieren Sie das endgültige Dokument",
                previewSummary: "Überprüfen Sie alle Abschnitte und klicken Sie auf \"AA generieren\", um Ihr endgültiges Dokument zu erstellen.",

                // Navigation Controls
                previous: "Zurück",
                next: "Weiter",
                generateSOP: "AA generieren",

                // Buttons and Actions
                cancel: "Abbrechen",
                confirm: "Bestätigen",
                save: "Speichern",
                edit: "Bearbeiten",
                delete: "Löschen",
                remove: "Entfernen",
                add: "Hinzufügen",
                close: "Schließen",

                // SOP Generation
                sopDocument: "Generierte Arbeitsanweisung",
                sopDocumentDescription: "Ihre vollständige Arbeitsanweisung",
                printSOP: "AA drucken",
                exportPDF: "PDF exportieren",
                editSOP: "AA bearbeiten",

                // Company Setup
                companySetup: "Unternehmenseinstellungen",
                companyName: "Unternehmensname",
                companyNamePlaceholder: "Geben Sie Ihren Unternehmensnamen ein",
                companyLogo: "Unternehmenslogo",
                companyLogoHelp: "Laden Sie Ihr Unternehmenslogo hoch (optional)",
                address: "Adresse",
                addressPlaceholder: "Unternehmensadresse eingeben",
                phone: "Telefon",
                phonePlaceholder: "Telefonnummer eingeben",
                email: "E-Mail",
                emailPlaceholder: "Unternehmens-E-Mail eingeben",
                website: "Website",
                websitePlaceholder: "Unternehmenswebsite eingeben",

                // Form Labels
                required: "erforderlich",
                optional: "optional",

                // Messages
                loading: "Laden...",
                noImage: "Kein Bild",
                clickToAddImage: "Klicken zum Hinzufügen eines Bildes",
                clickToChange: "Klicken zum Ändern",
                removeImage: "Entfernen",

                // Footer
                footerText: "Montage-AA-Generator",

                // Additional common text
                note: "Hinweis:",
                skipToMainContent: "Zum Hauptinhalt springen",
                selectLanguage: "Sprache auswählen",

                // Form field labels
                sopTitleLabel: "SOP-Titel",
                partNumberLabel: "Teilenummer",
                revisionLabel: "Revision",
                authorLabel: "Autor",
                departmentLabel: "Abteilung",
                approverLabel: "Genehmiger",
                effectiveDateLabel: "Gültigkeitsdatum",
                generalNotesLabel: "Allgemeine Hinweise",
                availablePartsLabel: "Verfügbare Teile",
                generalSafetyNotesLabel: "Allgemeine Sicherheitshinweise",

                // Section descriptions
                bomDescription: "Definieren Sie alle Teile und Komponenten, die für diese Montage benötigt werden",
                safetyDescriptionText: "Definieren Sie allgemeine Sicherheitsvorkehrungen und -anforderungen für diese SOP",
                assemblyDescriptionText: "Dokumentieren Sie den schrittweisen Montageprozess mit Werkzeugen, Vorrichtungen, Teilen und Sicherheit für jeden Schritt",
                previewDescriptionText: "Überprüfen Sie Ihre SOP und generieren Sie das endgültige Dokument",

                // Preview text
                sopPreviewTitle: "AA-Vorschau",
                previewPlaceholder1: "Ihre AA-Vorschau wird hier angezeigt, während Sie jeden Abschnitt vervollständigen.",
                previewPlaceholder2: "Klicken Sie auf \"AA generieren\", um das endgültige Dokument zu erstellen.",

                // Test data section
                testDataTitle: "Testdatengenerierung",
                testDataDesc: "Generieren Sie realistische Testdaten zur Erkundung der Anwendungsfunktionalität",
                databaseNoteText: "Der Datenbankbereich ist vom Haupt-AA-Erstellungsablauf getrennt. Verwenden Sie ihn zur Verwaltung wiederverwendbarer Elemente in mehreren AAs.",

                // Modal titles
                addSafetyItem: "Sicherheitselement hinzufügen",
                addTool: "Werkzeug hinzufügen",
                addFixture: "Vorrichtung hinzufügen",
                addBOMItem: "Stücklistenelement hinzufügen",
                addAssemblyStep: "Montageschritt hinzufügen",

                // Form fields
                name: "Name",
                identifier: "Kennung",
                description: "Beschreibung",
                category: "Kategorie",
                specifications: "Spezifikationen",
                quantity: "Menge",

                // Common placeholders
                enterName: "Namen eingeben",
                enterIdentifier: "Kennung eingeben",
                enterDescription: "Beschreibung eingeben",
                selectCategory: "Kategorie auswählen...",

                // Safety specific
                safetyItemName: "Name des Sicherheitselements",
                severityLevel: "Schweregrad",
                low: "Niedrig",
                medium: "Mittel",
                high: "Hoch",
                critical: "Kritisch",

                // Tool specific
                toolName: "Werkzeugname",
                toolIdentifier: "Werkzeugkennung",
                sizeSpecification: "Größe/Spezifikation",
                additionalSpecifications: "Zusätzliche Spezifikationen",

                // Fixture specific
                fixtureName: "Vorrichtungsname",
                fixtureIdentifier: "Vorrichtungskennung",

                // Part specific
                partName: "Teilename",
                partNumber: "Teilenummer",
                manufacturer: "Hersteller",

                // Assembly specific
                stepDescription: "Schrittbeschreibung",
                estimatedTime: "Geschätzte Zeit",
                minutes: "Minuten",

                // Categories
                ppe: "Persönliche Schutzausrüstung",
                environmentalSafety: "Umweltsicherheit",
                equipmentSafety: "Gerätesicherheit",
                chemicalSafety: "Chemische Sicherheit",
                fireSafety: "Brandschutz",
                medicalFirstAid: "Medizin/Erste Hilfe",
                generalSafety: "Allgemeine Sicherheit",

                handTools: "Handwerkzeuge",
                powerTools: "Elektrowerkzeuge",
                measuringTools: "Messwerkzeuge",
                cuttingTools: "Schneidwerkzeuge",
                assemblyTools: "Montagewerkzeuge",
                testingEquipment: "Prüfgeräte",
                generalTools: "Allgemeine Werkzeuge",

                assemblyFixtures: "Montagevorrichtungen",
                testingFixtures: "Prüfvorrichtungen",
                holdingFixtures: "Haltevorrichtungen",
                alignmentFixtures: "Ausrichtungsvorrichtungen",
                weldingFixtures: "Schweißvorrichtungen",
                inspectionFixtures: "Prüfvorrichtungen",
                generalFixtures: "Allgemeine Vorrichtungen",

                // Messages
                pleaseFillinRequired: "Bitte füllen Sie alle Pflichtfelder aus",
                errorAdding: "Fehler beim Hinzufügen",
                addedNew: "Neu hinzugefügt",
                addNewPart: "Neues Teil hinzufügen",
                pleaseProvideDescription: "Bitte geben Sie eine Schrittbeschreibung an",

                // Assembly step specific
                stepImage: "Schrittbild",
                stepImageHelp: "Laden Sie ein Bild hoch, um diesen Montageschritt zu veranschaulichen (optional)",
                partsUsed: "Verwendete Teile",
                toolsRequired: "Benötigte Werkzeuge",
                fixturesRequired: "Benötigte Vorrichtungen",
                safetyRequirements: "Sicherheitsanforderungen",
                additionalSafetyNotes: "Zusätzliche Sicherheitshinweise",
                qualityCheckRequired: "Qualitätsprüfung erforderlich",
                qualityCheckDescription: "Beschreibung der Qualitätsprüfung",
                additionalNotes: "Zusätzliche Hinweise",
                multiSelectHelp: "Halten Sie Strg/Cmd gedrückt, um mehrere Elemente auszuwählen",

                // Assembly display
                noAssemblySteps: "Noch keine Montageschritte definiert",
                assemblyHelp: "Klicken Sie auf \"Montageschritt hinzufügen\", um Ihren Montageprozess zu dokumentieren",
                moveStepUp: "Schritt nach oben verschieben",
                moveStepDown: "Schritt nach unten verschieben",
                editStep: "Schritt bearbeiten",
                removeStep: "Schritt entfernen",
                clickToAddChangeImage: "Klicken zum Hinzufügen/Ändern des Bildes",
                clickToAddImage: "Klicken zum Hinzufügen eines Bildes",
                qualityCheck: "Qualitätsprüfung",
                required: "Erforderlich",

                // SOP Generation
                assemblyProcedure: "MONTAGEVERFAHREN",
                noAssemblyStepsDefined: "Keine Montageschritte definiert",
                unknownPart: "Unbekanntes Teil",
                unknownTool: "Unbekanntes Werkzeug",
                unknownFixture: "Unbekannte Vorrichtung",
                toolsFixtures: "Werkzeuge/Vorrichtungen",
                time: "Zeit",
                image: "Bild",
                assemblyStep: "Montageschritt",
                noPartsSpecified: "Keine Teile in der Stückliste angegeben",
                general: "Allgemein",
                item: "Element",
                qty: "Menge",
                noSafetyRequirements: "Keine spezifischen Sicherheitsanforderungen definiert. Befolgen Sie die allgemeinen Arbeitsplatzsicherheitsrichtlinien.",
                warning: "WARNUNG",
                safetyWarning: "Stellen Sie sicher, dass alle Sicherheitsanforderungen erfüllt sind, bevor Sie mit der Montage beginnen.",

                // Additional SOP sections
                scope: "GELTUNGSBEREICH",
                scopeDescription: "Diese Arbeitsanweisung beschreibt den Montageprozess für die angegebenen Komponenten. Befolgen Sie alle Schritte in der richtigen Reihenfolge und halten Sie die Sicherheitsanforderungen während des gesamten Prozesses ein."
            },

            fr: {
                // Header and Navigation
                appTitle: "Générateur de SOP d'Assemblage",
                appSubtitle: "Rationalisez vos Procédures Opérationnelles Standard",
                navDatabase: "Base de données",
                navBasicInfo: "Info de base",
                navBOM: "Nomenclature",
                navSafety: "Sécurité",
                navAssembly: "Assemblage",
                navPreview: "Aperçu",
                navCompany: "⚙️ Entreprise",

                // Progress
                progressStep: "Étape",
                progressOf: "de",

                // Database Section
                databaseTitle: "Gérer votre base de données",
                databaseDescription: "Ajoutez des éléments à votre base de données une fois, réutilisez-les dans plusieurs SOP",
                safetyDatabase: "Base de données de sécurité",
                toolsDatabase: "Base de données d'outils",
                fixturesDatabase: "Base de données de montages",
                addSafetyItem: "Ajouter un élément de sécurité",
                addTool: "Ajouter un outil",
                addFixture: "Ajouter un montage",
                addNewPart: "Ajouter une nouvelle pièce",
                databaseNote: "La section Base de données est séparée du flux principal de création de SOP. Utilisez-la pour gérer les éléments réutilisables dans plusieurs SOP.",

                // Test Data
                testDataGeneration: "🎭 Génération de données de test",
                testDataDescription: "Générez des données de test réalistes pour explorer la fonctionnalité de l'application",
                generateFullTestData: "🎯 Générer des données de test complètes",
                clearAllData: "🗑️ Effacer toutes les données",

                // Basic Info Section
                basicInfoTitle: "Informations de base",
                basicInfoDescription: "Entrez les détails fondamentaux de votre document SOP",
                sopTitle: "Titre SOP",
                sopTitlePlaceholder: "Entrez le titre SOP (ex: 'Processus d'assemblage de widget')",
                sopTitleHelp: "Un titre clair et descriptif pour cette Procédure Opérationnelle Standard",
                partNumber: "Numéro de pièce",
                partNumberPlaceholder: "Entrez le numéro de pièce (ex: 'WDG-001-A')",
                partNumberHelp: "Identifiant unique pour la pièce ou l'assemblage",
                revision: "Révision",
                revisionHelp: "Niveau de révision du document (ex: A, B, C ou 1.0, 1.1)",
                author: "Auteur",
                authorPlaceholder: "Entrez le nom de l'auteur",
                authorHelp: "Personne responsable de la création de cette SOP",
                department: "Département",
                departmentPlaceholder: "Entrez le département (ex: 'Fabrication', 'Assemblage')",
                departmentHelp: "Département ou équipe responsable de ce processus",
                approver: "Approbateur",
                approverPlaceholder: "Entrez le nom de l'approbateur",
                approverHelp: "Personne qui a approuvé cette SOP pour utilisation",
                effectiveDate: "Date d'entrée en vigueur",
                effectiveDateHelp: "Date à laquelle cette SOP devient effective",
                generalNotes: "Notes générales",
                generalNotesPlaceholder: "Entrez des notes générales, des instructions spéciales ou des informations supplémentaires sur cette SOP...",
                generalNotesHelp: "Notes optionnelles ou instructions spéciales pour cette SOP",

                // BOM Section
                bomTitle: "Nomenclature",
                bomDescription: "Définissez toutes les pièces et composants nécessaires pour cet assemblage",
                availableParts: "Pièces disponibles",
                addBOMItem: "Ajouter un élément de nomenclature",

                // Safety Section
                safetyTitle: "Exigences de sécurité",
                safetyDescription: "Définissez les précautions de sécurité générales et les exigences pour cette SOP",
                generalSafetyNotes: "Notes de sécurité générales",
                safetyNotesPlaceholder: "Décrivez les précautions de sécurité générales pour ce processus d'assemblage...",
                addSafetyFromDatabase: "Ajouter des éléments de sécurité depuis la base de données",
                selectSafetyItem: "Sélectionnez un élément de sécurité à ajouter...",
                noSafetySelected: "Aucun élément de sécurité sélectionné pour le moment",

                // Assembly Section
                assemblyTitle: "Séquence d'assemblage",
                assemblyDescription: "Documentez le processus d'assemblage étape par étape avec les outils, montages, pièces et sécurité pour chaque étape",
                addAssemblyStep: "Ajouter une étape d'assemblage",

                // Preview Section
                previewTitle: "Aperçu et génération",
                previewDescription: "Examinez votre SOP et générez le document final",
                previewSummary: "Examinez toutes les sections et cliquez sur \"Générer SOP\" pour créer votre document final.",

                // Navigation Controls
                previous: "Précédent",
                next: "Suivant",
                generateSOP: "📄 Générer SOP",

                // Buttons and Actions
                cancel: "Annuler",
                confirm: "Confirmer",
                save: "Enregistrer",
                edit: "Modifier",
                delete: "Supprimer",
                remove: "Retirer",
                add: "Ajouter",
                close: "Fermer",

                // SOP Generation
                sopDocument: "Document SOP généré",
                sopDocumentDescription: "Votre Procédure Opérationnelle Standard complète",
                printSOP: "🖨️ Imprimer SOP",
                exportPDF: "💾 Exporter PDF",
                editSOP: "✏️ Modifier SOP",

                // Company Setup
                companySetup: "Configuration de l'entreprise",
                companyName: "Nom de l'entreprise",
                companyNamePlaceholder: "Entrez le nom de votre entreprise",
                companyLogo: "Logo de l'entreprise",
                companyLogoHelp: "Téléchargez le logo de votre entreprise (optionnel)",
                address: "Adresse",
                addressPlaceholder: "Entrez l'adresse de l'entreprise",
                phone: "Téléphone",
                phonePlaceholder: "Entrez le numéro de téléphone",
                email: "E-mail",
                emailPlaceholder: "Entrez l'e-mail de l'entreprise",
                website: "Site web",
                websitePlaceholder: "Entrez le site web de l'entreprise",

                // Form Labels
                required: "requis",
                optional: "optionnel",

                // Messages
                loading: "Chargement...",
                noImage: "Aucune image",
                clickToAddImage: "Cliquez pour ajouter une image",
                clickToChange: "Cliquez pour changer",
                removeImage: "Retirer",

                // Footer
                footerText: "Générateur de SOP d'Assemblage",

                // Additional common text
                note: "Note :",
                skipToMainContent: "Aller au contenu principal",
                selectLanguage: "Sélectionner la langue",

                // Form field labels
                sopTitleLabel: "Titre SOP",
                partNumberLabel: "Numéro de pièce",
                revisionLabel: "Révision",
                authorLabel: "Auteur",
                departmentLabel: "Département",
                approverLabel: "Approbateur",
                effectiveDateLabel: "Date d'entrée en vigueur",
                generalNotesLabel: "Notes générales",
                availablePartsLabel: "Pièces disponibles",
                generalSafetyNotesLabel: "Notes de sécurité générales",

                // Section descriptions
                bomDescription: "Définissez toutes les pièces et composants nécessaires pour cet assemblage",
                safetyDescriptionText: "Définissez les précautions de sécurité générales et les exigences pour cette SOP",
                assemblyDescriptionText: "Documentez le processus d'assemblage étape par étape avec les outils, montages, pièces et sécurité pour chaque étape",
                previewDescriptionText: "Examinez votre SOP et générez le document final",

                // Preview text
                sopPreviewTitle: "Aperçu SOP",
                previewPlaceholder1: "Votre aperçu SOP apparaîtra ici au fur et à mesure que vous complétez chaque section.",
                previewPlaceholder2: "Cliquez sur \"Générer SOP\" pour créer le document final.",

                // Test data section
                testDataTitle: "Génération de données de test",
                testDataDesc: "Générez des données de test réalistes pour explorer la fonctionnalité de l'application",
                databaseNoteText: "La section Base de données est séparée du flux principal de création de SOP. Utilisez-la pour gérer les éléments réutilisables dans plusieurs SOP.",

                // Modal titles
                addSafetyItem: "Ajouter un élément de sécurité",
                addTool: "Ajouter un outil",
                addFixture: "Ajouter un montage",
                addBOMItem: "Ajouter un élément de nomenclature",
                addAssemblyStep: "Ajouter une étape d'assemblage",

                // Form fields
                name: "Nom",
                identifier: "Identifiant",
                description: "Description",
                category: "Catégorie",
                specifications: "Spécifications",
                quantity: "Quantité",

                // Common placeholders
                enterName: "Entrez le nom",
                enterIdentifier: "Entrez l'identifiant",
                enterDescription: "Entrez la description",
                selectCategory: "Sélectionnez une catégorie...",

                // Safety specific
                safetyItemName: "Nom de l'élément de sécurité",
                severityLevel: "Niveau de gravité",
                low: "Faible",
                medium: "Moyen",
                high: "Élevé",
                critical: "Critique",

                // Tool specific
                toolName: "Nom de l'outil",
                toolIdentifier: "Identifiant de l'outil",
                sizeSpecification: "Taille/Spécification",
                additionalSpecifications: "Spécifications supplémentaires",

                // Fixture specific
                fixtureName: "Nom du montage",
                fixtureIdentifier: "Identifiant du montage",

                // Part specific
                partName: "Nom de la pièce",
                partNumber: "Numéro de pièce",
                manufacturer: "Fabricant",

                // Assembly specific
                stepDescription: "Description de l'étape",
                estimatedTime: "Temps estimé",
                minutes: "minutes",

                // Categories
                ppe: "Équipement de Protection Individuelle",
                environmentalSafety: "Sécurité environnementale",
                equipmentSafety: "Sécurité des équipements",
                chemicalSafety: "Sécurité chimique",
                fireSafety: "Sécurité incendie",
                medicalFirstAid: "Médical/Premiers secours",
                generalSafety: "Sécurité générale",

                handTools: "Outils à main",
                powerTools: "Outils électriques",
                measuringTools: "Outils de mesure",
                cuttingTools: "Outils de coupe",
                assemblyTools: "Outils d'assemblage",
                testingEquipment: "Équipement de test",
                generalTools: "Outils généraux",

                assemblyFixtures: "Montages d'assemblage",
                testingFixtures: "Montages de test",
                holdingFixtures: "Montages de maintien",
                alignmentFixtures: "Montages d'alignement",
                weldingFixtures: "Montages de soudage",
                inspectionFixtures: "Montages d'inspection",
                generalFixtures: "Montages généraux",

                // Messages
                pleaseFillinRequired: "Veuillez remplir tous les champs obligatoires",
                errorAdding: "Erreur lors de l'ajout",
                addedNew: "Nouveau ajouté",
                addNewPart: "Ajouter une nouvelle pièce",
                pleaseProvideDescription: "Veuillez fournir une description de l'étape",

                // Assembly step specific
                stepImage: "Image de l'étape",
                stepImageHelp: "Téléchargez une image pour illustrer cette étape d'assemblage (optionnel)",
                partsUsed: "Pièces utilisées",
                toolsRequired: "Outils requis",
                fixturesRequired: "Montages requis",
                safetyRequirements: "Exigences de sécurité",
                additionalSafetyNotes: "Notes de sécurité supplémentaires",
                qualityCheckRequired: "Contrôle qualité requis",
                qualityCheckDescription: "Description du contrôle qualité",
                additionalNotes: "Notes supplémentaires",
                multiSelectHelp: "Maintenez Ctrl/Cmd pour sélectionner plusieurs éléments",

                // Assembly display
                noAssemblySteps: "Aucune étape d'assemblage définie pour le moment",
                assemblyHelp: "Cliquez sur \"Ajouter une étape d'assemblage\" pour commencer à documenter votre processus d'assemblage",
                moveStepUp: "Déplacer l'étape vers le haut",
                moveStepDown: "Déplacer l'étape vers le bas",
                editStep: "Modifier l'étape",
                removeStep: "Supprimer l'étape",
                clickToAddChangeImage: "Cliquez pour ajouter/modifier l'image",
                clickToAddImage: "Cliquez pour ajouter une image",
                qualityCheck: "Contrôle qualité",
                required: "Requis",

                // SOP Generation
                assemblyProcedure: "PROCÉDURE D'ASSEMBLAGE",
                noAssemblyStepsDefined: "Aucune étape d'assemblage définie",
                unknownPart: "Pièce inconnue",
                unknownTool: "Outil inconnu",
                unknownFixture: "Montage inconnu",
                toolsFixtures: "Outils/Montages",
                time: "Temps",
                image: "Image",
                assemblyStep: "Étape d'assemblage",
                noPartsSpecified: "Aucune pièce spécifiée dans la nomenclature",
                general: "Général",
                item: "Élément",
                qty: "Qté",
                noSafetyRequirements: "Aucune exigence de sécurité spécifique définie. Suivez les directives générales de sécurité au travail.",
                warning: "AVERTISSEMENT",
                safetyWarning: "Assurez-vous que toutes les exigences de sécurité sont respectées avant de commencer l'assemblage.",

                // Additional SOP sections
                scope: "PORTÉE",
                scopeDescription: "Cette Procédure Opérationnelle Standard décrit le processus d'assemblage pour les composants spécifiés. Suivez toutes les étapes dans l'ordre et respectez les exigences de sécurité tout au long du processus."
            }
        };
    }

    /**
     * Initialize language from localStorage or browser preference
     */
    initializeLanguage() {
        const savedLanguage = localStorage.getItem('sopgen-language');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else {
            // Detect browser language
            const browserLang = navigator.language.substring(0, 2);
            if (this.translations[browserLang]) {
                this.currentLanguage = browserLang;
            }
        }
    }

    /**
     * Get translation for a key
     */
    t(key) {
        const translation = this.translations[this.currentLanguage]?.[key];
        return translation || this.translations.en[key] || key;
    }

    /**
     * Set current language
     */
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('sopgen-language', language);
            this.updateUI();
        }
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' }
        ];
    }

    /**
     * Update UI with current language
     */
    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'tel' || element.type === 'url')) {
                element.placeholder = translation;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // Update elements with data-i18n-aria-label attribute
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.t(key));
        });

        // Auto-translate elements without data-i18n attributes
        this.autoTranslateElements();

        // Emit language change event
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }

    /**
     * Automatically translate elements that don't have data-i18n attributes
     */
    autoTranslateElements() {
        // Skip if English (no translation needed)
        if (this.currentLanguage === 'en') return;

        // Define text mappings for auto-translation
        const textMappings = this.getTextMappings();

        // Find and translate text nodes
        this.translateTextNodes(document.body, textMappings);

        // Translate placeholders
        this.translatePlaceholders(textMappings);

        // Translate specific attributes
        this.translateAttributes(textMappings);
    }

    /**
     * Get text mappings for current language
     */
    getTextMappings() {
        const mappings = {
            de: {
                // Form labels and common text
                'SOP Title': 'SOP-Titel',
                'Part Number': 'Teilenummer',
                'Revision': 'Revision',
                'Author': 'Autor',
                'Department': 'Abteilung',
                'Approver': 'Genehmiger',
                'Effective Date': 'Gültigkeitsdatum',
                'General Notes': 'Allgemeine Hinweise',
                'Available Parts': 'Verfügbare Teile',
                'General Safety Notes': 'Allgemeine Sicherheitshinweise',
                'Add Safety Items from Database': 'Sicherheitselemente aus Datenbank hinzufügen',
                'Select safety item to add...': 'Sicherheitselement zum Hinzufügen auswählen...',
                'SOP Preview': 'SOP-Vorschau',
                'Loading...': 'Laden...',
                'Note:': 'Hinweis:',
                'Test Data Generation': 'Testdatengenerierung',
                'Generate realistic test data to explore the application functionality': 'Generieren Sie realistische Testdaten zur Erkundung der Anwendungsfunktionalität',
                'The Database section is separate from the main SOP creation flow. Use it to manage reusable items across multiple SOPs.': 'Der Datenbankbereich ist vom Haupt-SOP-Erstellungsablauf getrennt. Verwenden Sie ihn zur Verwaltung wiederverwendbarer Elemente in mehreren SOPs.',
                'Define all parts and components needed for this assembly': 'Definieren Sie alle Teile und Komponenten, die für diese Montage benötigt werden',
                'Define general safety precautions and requirements for this SOP': 'Definieren Sie allgemeine Sicherheitsvorkehrungen und -anforderungen für diese SOP',
                'Document the step-by-step assembly process with tools, fixtures, parts, and safety for each step': 'Dokumentieren Sie den schrittweisen Montageprozess mit Werkzeugen, Vorrichtungen, Teilen und Sicherheit für jeden Schritt',
                'Review your SOP and generate the final document': 'Überprüfen Sie Ihre SOP und generieren Sie das endgültige Dokument',
                'Review all sections and click "Generate SOP" to create your final document.': 'Überprüfen Sie alle Abschnitte und klicken Sie auf "SOP generieren", um Ihr endgültiges Dokument zu erstellen.',
                'Your SOP preview will appear here as you complete each section.': 'Ihre SOP-Vorschau wird hier angezeigt, während Sie jeden Abschnitt vervollständigen.',
                'Click "Generate SOP" to create the final document.': 'Klicken Sie auf "SOP generieren", um das endgültige Dokument zu erstellen.',
                'Skip to main content': 'Zum Hauptinhalt springen',
                'Select language': 'Sprache auswählen',
                // Placeholders
                'Enter the SOP title (e.g., \'Widget Assembly Process\')': 'SOP-Titel eingeben (z.B. \'Widget-Montageprozess\')',
                'Enter part number (e.g., \'WDG-001-A\')': 'Teilenummer eingeben (z.B. \'WDG-001-A\')',
                'Enter author name': 'Autorennamen eingeben',
                'Enter department (e.g., \'Manufacturing\', \'Assembly\')': 'Abteilung eingeben (z.B. \'Fertigung\', \'Montage\')',
                'Enter approver name': 'Namen des Genehmigers eingeben',
                'Enter any general notes, special instructions, or additional information about this SOP...': 'Geben Sie allgemeine Hinweise, spezielle Anweisungen oder zusätzliche Informationen zu dieser SOP ein...',
                'Describe general safety precautions for this assembly process...': 'Beschreiben Sie allgemeine Sicherheitsvorkehrungen für diesen Montageprozess...',
                // Help text
                'A clear, descriptive title for this Standard Operating Procedure': 'Ein klarer, beschreibender Titel für diese Standardarbeitsanweisung',
                'Unique identifier for the part or assembly': 'Eindeutige Kennung für das Teil oder die Baugruppe',
                'Document revision level (e.g., A, B, C or 1.0, 1.1)': 'Dokumentrevisionsstufe (z.B. A, B, C oder 1.0, 1.1)',
                'Person responsible for creating this SOP': 'Person, die für die Erstellung dieser SOP verantwortlich ist',
                'Department or team responsible for this process': 'Abteilung oder Team, das für diesen Prozess verantwortlich ist',
                'Person who approved this SOP for use': 'Person, die diese SOP zur Verwendung genehmigt hat',
                'Date when this SOP becomes effective': 'Datum, an dem diese SOP wirksam wird',
                'Optional notes or special instructions for this SOP': 'Optionale Hinweise oder spezielle Anweisungen für diese SOP',

                // Modal content
                'Safety Item Name': 'Name des Sicherheitselements',
                'Tool Name': 'Werkzeugname',
                'Fixture Name': 'Vorrichtungsname',
                'Part Name': 'Teilename',
                'Identifier': 'Kennung',
                'Description': 'Beschreibung',
                'Category': 'Kategorie',
                'Severity Level': 'Schweregrad',
                'Size/Specification': 'Größe/Spezifikation',
                'Additional Specifications': 'Zusätzliche Spezifikationen',
                'Quantity': 'Menge',
                'Manufacturer': 'Hersteller',
                'Step Description': 'Schrittbeschreibung',
                'Estimated Time': 'Geschätzte Zeit',
                'Personal Protective Equipment': 'Persönliche Schutzausrüstung',
                'Environmental Safety': 'Umweltsicherheit',
                'Equipment Safety': 'Gerätesicherheit',
                'Chemical Safety': 'Chemische Sicherheit',
                'Fire Safety': 'Brandschutz',
                'General Safety': 'Allgemeine Sicherheit',
                'Hand Tools': 'Handwerkzeuge',
                'Power Tools': 'Elektrowerkzeuge',
                'Measuring Tools': 'Messwerkzeuge',
                'Assembly Tools': 'Montagewerkzeuge',
                'Testing Equipment': 'Prüfgeräte',
                'General Tools': 'Allgemeine Werkzeuge',
                'Assembly Fixtures': 'Montagevorrichtungen',
                'Testing Fixtures': 'Prüfvorrichtungen',
                'Holding Fixtures': 'Haltevorrichtungen',
                'General Fixtures': 'Allgemeine Vorrichtungen',
                'Low': 'Niedrig',
                'Medium': 'Mittel',
                'High': 'Hoch',
                'Critical': 'Kritisch',
                'Please fill in all required fields': 'Bitte füllen Sie alle Pflichtfelder aus',

                // SOP → AA translations
                'SOP': 'AA',
                'Standard Operating Procedure': 'Arbeitsanweisung',
                'SOP Title': 'AA-Titel',
                'SOP Preview': 'AA-Vorschau',
                'Generate SOP': 'AA generieren',
                'Print SOP': 'AA drucken',
                'Edit SOP': 'AA bearbeiten'
            },
            fr: {
                // Form labels and common text
                'SOP Title': 'Titre SOP',
                'Part Number': 'Numéro de pièce',
                'Revision': 'Révision',
                'Author': 'Auteur',
                'Department': 'Département',
                'Approver': 'Approbateur',
                'Effective Date': 'Date d\'entrée en vigueur',
                'General Notes': 'Notes générales',
                'Available Parts': 'Pièces disponibles',
                'General Safety Notes': 'Notes de sécurité générales',
                'Add Safety Items from Database': 'Ajouter des éléments de sécurité depuis la base de données',
                'Select safety item to add...': 'Sélectionnez un élément de sécurité à ajouter...',
                'SOP Preview': 'Aperçu SOP',
                'Loading...': 'Chargement...',
                'Note:': 'Note :',
                'Test Data Generation': 'Génération de données de test',
                'Generate realistic test data to explore the application functionality': 'Générez des données de test réalistes pour explorer la fonctionnalité de l\'application',
                'The Database section is separate from the main SOP creation flow. Use it to manage reusable items across multiple SOPs.': 'La section Base de données est séparée du flux principal de création de SOP. Utilisez-la pour gérer les éléments réutilisables dans plusieurs SOP.',
                'Define all parts and components needed for this assembly': 'Définissez toutes les pièces et composants nécessaires pour cet assemblage',
                'Define general safety precautions and requirements for this SOP': 'Définissez les précautions de sécurité générales et les exigences pour cette SOP',
                'Document the step-by-step assembly process with tools, fixtures, parts, and safety for each step': 'Documentez le processus d\'assemblage étape par étape avec les outils, montages, pièces et sécurité pour chaque étape',
                'Review your SOP and generate the final document': 'Examinez votre SOP et générez le document final',
                'Review all sections and click "Generate SOP" to create your final document.': 'Examinez toutes les sections et cliquez sur "Générer SOP" pour créer votre document final.',
                'Your SOP preview will appear here as you complete each section.': 'Votre aperçu SOP apparaîtra ici au fur et à mesure que vous complétez chaque section.',
                'Click "Generate SOP" to create the final document.': 'Cliquez sur "Générer SOP" pour créer le document final.',
                'Skip to main content': 'Aller au contenu principal',
                'Select language': 'Sélectionner la langue',
                // Placeholders
                'Enter the SOP title (e.g., \'Widget Assembly Process\')': 'Entrez le titre SOP (ex: \'Processus d\'assemblage de widget\')',
                'Enter part number (e.g., \'WDG-001-A\')': 'Entrez le numéro de pièce (ex: \'WDG-001-A\')',
                'Enter author name': 'Entrez le nom de l\'auteur',
                'Enter department (e.g., \'Manufacturing\', \'Assembly\')': 'Entrez le département (ex: \'Fabrication\', \'Assemblage\')',
                'Enter approver name': 'Entrez le nom de l\'approbateur',
                'Enter any general notes, special instructions, or additional information about this SOP...': 'Entrez des notes générales, des instructions spéciales ou des informations supplémentaires sur cette SOP...',
                'Describe general safety precautions for this assembly process...': 'Décrivez les précautions de sécurité générales pour ce processus d\'assemblage...',
                // Help text
                'A clear, descriptive title for this Standard Operating Procedure': 'Un titre clair et descriptif pour cette Procédure Opérationnelle Standard',
                'Unique identifier for the part or assembly': 'Identifiant unique pour la pièce ou l\'assemblage',
                'Document revision level (e.g., A, B, C or 1.0, 1.1)': 'Niveau de révision du document (ex: A, B, C ou 1.0, 1.1)',
                'Person responsible for creating this SOP': 'Personne responsable de la création de cette SOP',
                'Department or team responsible for this process': 'Département ou équipe responsable de ce processus',
                'Person who approved this SOP for use': 'Personne qui a approuvé cette SOP pour utilisation',
                'Date when this SOP becomes effective': 'Date à laquelle cette SOP devient effective',
                'Optional notes or special instructions for this SOP': 'Notes optionnelles ou instructions spéciales pour cette SOP',

                // Modal content
                'Safety Item Name': 'Nom de l\'élément de sécurité',
                'Tool Name': 'Nom de l\'outil',
                'Fixture Name': 'Nom du montage',
                'Part Name': 'Nom de la pièce',
                'Identifier': 'Identifiant',
                'Description': 'Description',
                'Category': 'Catégorie',
                'Severity Level': 'Niveau de gravité',
                'Size/Specification': 'Taille/Spécification',
                'Additional Specifications': 'Spécifications supplémentaires',
                'Quantity': 'Quantité',
                'Manufacturer': 'Fabricant',
                'Step Description': 'Description de l\'étape',
                'Estimated Time': 'Temps estimé',
                'Personal Protective Equipment': 'Équipement de Protection Individuelle',
                'Environmental Safety': 'Sécurité environnementale',
                'Equipment Safety': 'Sécurité des équipements',
                'Chemical Safety': 'Sécurité chimique',
                'Fire Safety': 'Sécurité incendie',
                'General Safety': 'Sécurité générale',
                'Hand Tools': 'Outils à main',
                'Power Tools': 'Outils électriques',
                'Measuring Tools': 'Outils de mesure',
                'Assembly Tools': 'Outils d\'assemblage',
                'Testing Equipment': 'Équipement de test',
                'General Tools': 'Outils généraux',
                'Assembly Fixtures': 'Montages d\'assemblage',
                'Testing Fixtures': 'Montages de test',
                'Holding Fixtures': 'Montages de maintien',
                'General Fixtures': 'Montages généraux',
                'Low': 'Faible',
                'Medium': 'Moyen',
                'High': 'Élevé',
                'Critical': 'Critique',
                'Please fill in all required fields': 'Veuillez remplir tous les champs obligatoires'
            }
        };

        return mappings[this.currentLanguage] || {};
    }

    /**
     * Translate text nodes recursively
     */
    translateTextNodes(element, mappings) {
        // Skip elements that already have data-i18n or are script/style tags
        if (element.hasAttribute && (element.hasAttribute('data-i18n') ||
            ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(element.tagName))) {
            return;
        }

        if (element.nodeType === Node.TEXT_NODE) {
            const text = element.textContent.trim();
            if (text && mappings[text]) {
                element.textContent = element.textContent.replace(text, mappings[text]);
            }
        } else if (element.childNodes) {
            Array.from(element.childNodes).forEach(child => {
                this.translateTextNodes(child, mappings);
            });
        }
    }

    /**
     * Translate placeholder attributes
     */
    translatePlaceholders(mappings) {
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(element => {
            if (!element.hasAttribute('data-i18n')) {
                const placeholder = element.placeholder;
                if (mappings[placeholder]) {
                    element.placeholder = mappings[placeholder];
                }
            }
        });
    }

    /**
     * Translate specific attributes
     */
    translateAttributes(mappings) {
        // Translate aria-label attributes
        document.querySelectorAll('[aria-label]').forEach(element => {
            if (!element.hasAttribute('data-i18n-aria-label')) {
                const ariaLabel = element.getAttribute('aria-label');
                if (mappings[ariaLabel]) {
                    element.setAttribute('aria-label', mappings[ariaLabel]);
                }
            }
        });

        // Translate title attributes
        document.querySelectorAll('[title]').forEach(element => {
            if (!element.hasAttribute('data-i18n-title')) {
                const title = element.title;
                if (mappings[title]) {
                    element.title = mappings[title];
                }
            }
        });
    }
}

// Create global i18n instance
window.i18n = new I18nManager();

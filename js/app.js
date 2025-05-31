/**
 * Assembly SOP Generator - Main Application JavaScript
 * Updated for new navigation structure with separate Database section
 */

// Data Models
/**
 * Part Model - Represents a component/part in the database
 */
class Part {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.name = data.name || '';
        this.partNumber = data.partNumber || '';
        this.description = data.description || '';
        this.specifications = data.specifications || '';
        this.category = data.category || 'general';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        
        this.validate();
    }
    
    generateId() {
        return 'part_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validate() {
        // Only validate if we have some content - allow empty parts during initialization
        if (this.name.trim() || this.partNumber.trim()) {
            if (!this.name.trim()) {
                throw new Error('Part name is required');
            }
            if (!this.partNumber.trim()) {
                throw new Error('Part number is required');
            }
        }
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
        this.validate();
        return this;
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            partNumber: this.partNumber,
            description: this.description,
            specifications: this.specifications,
            category: this.category,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * Tool Model - Represents a tool in the database
 */
class Tool {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.name = data.name || '';
        this.size = data.size || '';
        this.specifications = data.specifications || '';
        this.identifier = data.identifier || '';
        this.category = data.category || 'general';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        
        this.validate();
    }
    
    generateId() {
        return 'tool_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validate() {
        // Only validate if we have some content - allow empty tools during initialization
        if (this.name.trim() || this.identifier.trim()) {
            if (!this.name.trim()) {
                throw new Error('Tool name is required');
            }
            if (!this.identifier.trim()) {
                throw new Error('Tool identifier is required');
            }
        }
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
        this.validate();
        return this;
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            size: this.size,
            specifications: this.specifications,
            identifier: this.identifier,
            category: this.category,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * Fixture Model - Represents a fixture in the database
 */
class Fixture {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.name = data.name || '';
        this.identifier = data.identifier || '';
        this.description = data.description || '';
        this.category = data.category || 'general';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        
        this.validate();
    }
    
    generateId() {
        return 'fixture_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validate() {
        // Only validate if we have some content - allow empty fixtures during initialization
        if (this.name.trim() || this.identifier.trim()) {
            if (!this.name.trim()) {
                throw new Error('Fixture name is required');
            }
            if (!this.identifier.trim()) {
                throw new Error('Fixture identifier is required');
            }
        }
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
        this.validate();
        return this;
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            identifier: this.identifier,
            description: this.description,
            category: this.category,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * Assembly Step Model - Represents a single assembly step
 */
class AssemblyStep {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.stepNumber = data.stepNumber || 1;
        this.description = data.description || '';
        this.parts = data.parts || []; // Array of part IDs with quantities
        this.tools = data.tools || []; // Array of tool IDs
        this.fixtures = data.fixtures || []; // Array of fixture IDs
        this.safety = data.safety || []; // Array of safety requirements
        this.qualityCheck = data.qualityCheck || false;
        this.qualityDescription = data.qualityDescription || '';
        this.notes = data.notes || '';
        this.estimatedTime = data.estimatedTime || 0; // in minutes
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        
        this.validate();
    }
    
    generateId() {
        return 'step_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validate() {
        // Only validate if we have some content - allow empty steps during initialization
        if (this.description.trim()) {
            if (!this.description.trim()) {
                throw new Error('Step description is required');
            }
        }
        if (this.stepNumber < 1) {
            throw new Error('Step number must be greater than 0');
        }
    }
    
    addPart(partId, quantity = 1) {
        const existingPart = this.parts.find(p => p.partId === partId);
        if (existingPart) {
            existingPart.quantity += quantity;
        } else {
            this.parts.push({ partId, quantity });
        }
        this.updatedAt = new Date().toISOString();
    }
    
    removePart(partId) {
        this.parts = this.parts.filter(p => p.partId !== partId);
        this.updatedAt = new Date().toISOString();
    }
    
    addTool(toolId) {
        if (!this.tools.includes(toolId)) {
            this.tools.push(toolId);
            this.updatedAt = new Date().toISOString();
        }
    }
    
    removeTool(toolId) {
        this.tools = this.tools.filter(t => t !== toolId);
        this.updatedAt = new Date().toISOString();
    }
    
    addFixture(fixtureId) {
        if (!this.fixtures.includes(fixtureId)) {
            this.fixtures.push(fixtureId);
            this.updatedAt = new Date().toISOString();
        }
    }
    
    removeFixture(fixtureId) {
        this.fixtures = this.fixtures.filter(f => f !== fixtureId);
        this.updatedAt = new Date().toISOString();
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
        this.validate();
        return this;
    }
    
    toJSON() {
        return {
            id: this.id,
            stepNumber: this.stepNumber,
            description: this.description,
            parts: this.parts,
            tools: this.tools,
            fixtures: this.fixtures,
            safety: this.safety,
            qualityCheck: this.qualityCheck,
            qualityDescription: this.qualityDescription,
            notes: this.notes,
            estimatedTime: this.estimatedTime,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * SOP Model - Represents the complete Standard Operating Procedure
 */
class SOP {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.title = data.title || '';
        this.partNumber = data.partNumber || '';
        this.revision = data.revision || 'A';
        this.author = data.author || '';
        this.department = data.department || '';
        this.approver = data.approver || '';
        this.effectiveDate = data.effectiveDate || '';
        this.bom = data.bom || []; // Array of part IDs with quantities
        this.tools = data.tools || []; // Array of tool IDs
        this.fixtures = data.fixtures || []; // Array of fixture IDs
        this.safety = data.safety || []; // Array of safety requirements
        
        // Convert steps data to AssemblyStep objects if needed
        this.steps = [];
        if (data.steps && Array.isArray(data.steps)) {
            data.steps.forEach(stepData => {
                // If it's already an AssemblyStep instance, use it directly
                if (stepData instanceof AssemblyStep) {
                    this.steps.push(stepData);
                } else {
                    // Otherwise, create a new AssemblyStep from the data
                    this.steps.push(new AssemblyStep(stepData));
                }
            });
        }
        
        this.notes = data.notes || '';
        this.estimatedTotalTime = data.estimatedTotalTime || 0;
        this.status = data.status || 'draft'; // draft, review, approved, archived
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        
        this.validate();
    }
    
    generateId() {
        return 'sop_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validate() {
        // Only validate if we have some content - allow empty SOPs during initialization
        if (this.title.trim() || this.partNumber.trim() || this.author.trim()) {
            if (!this.title.trim()) {
                throw new Error('SOP title is required');
            }
            if (!this.partNumber.trim()) {
                throw new Error('Part number is required');
            }
            if (!this.author.trim()) {
                throw new Error('Author is required');
            }
        }
    }
    
    addBOMItem(partId, quantity = 1) {
        const existingItem = this.bom.find(item => item.partId === partId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.bom.push({ partId, quantity });
        }
        this.updatedAt = new Date().toISOString();
    }
    
    removeBOMItem(partId) {
        this.bom = this.bom.filter(item => item.partId !== partId);
        this.updatedAt = new Date().toISOString();
    }
    
    addTool(toolId) {
        if (!this.tools.includes(toolId)) {
            this.tools.push(toolId);
            this.updatedAt = new Date().toISOString();
        }
    }
    
    removeTool(toolId) {
        this.tools = this.tools.filter(t => t !== toolId);
        this.updatedAt = new Date().toISOString();
    }
    
    addFixture(fixtureId) {
        if (!this.fixtures.includes(fixtureId)) {
            this.fixtures.push(fixtureId);
            this.updatedAt = new Date().toISOString();
        }
    }
    
    removeFixture(fixtureId) {
        this.fixtures = this.fixtures.filter(f => f !== fixtureId);
        this.updatedAt = new Date().toISOString();
    }
    
    addSafetyRequirement(requirement) {
        if (!this.safety.includes(requirement)) {
            this.safety.push(requirement);
            this.updatedAt = new Date().toISOString();
        }
    }
    
    removeSafetyRequirement(requirement) {
        this.safety = this.safety.filter(s => s !== requirement);
        this.updatedAt = new Date().toISOString();
    }
    
    addStep(stepData) {
        const step = new AssemblyStep(stepData);
        step.stepNumber = this.steps.length + 1;
        this.steps.push(step);
        this.calculateTotalTime();
        this.updatedAt = new Date().toISOString();
        return step;
    }
    
    removeStep(stepId) {
        this.steps = this.steps.filter(step => step.id !== stepId);
        this.reorderSteps();
        this.calculateTotalTime();
        this.updatedAt = new Date().toISOString();
    }
    
    reorderSteps() {
        this.steps.forEach((step, index) => {
            step.stepNumber = index + 1;
        });
    }
    
    calculateTotalTime() {
        this.estimatedTotalTime = this.steps.reduce((total, step) => total + step.estimatedTime, 0);
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
        this.validate();
        return this;
    }
    
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            partNumber: this.partNumber,
            revision: this.revision,
            author: this.author,
            department: this.department,
            approver: this.approver,
            effectiveDate: this.effectiveDate,
            bom: this.bom,
            tools: this.tools,
            fixtures: this.fixtures,
            safety: this.safety,
            steps: this.steps.map(step => step.toJSON()),
            notes: this.notes,
            estimatedTotalTime: this.estimatedTotalTime,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * Local Storage Service - Enhanced storage management with versioning and error handling
 */
class StorageService {
    constructor() {
        this.storageKey = 'sopGenerator_data';
        this.versionKey = 'sopGenerator_version';
        this.currentVersion = '1.0.0';
        this.maxStorageSize = 5 * 1024 * 1024; // 5MB limit
        this.compressionEnabled = true;
        
        this.migrationHandlers = new Map();
        this.setupMigrationHandlers();
    }
    
    /**
     * Check if localStorage is available and functional
     */
    isStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            console.warn('localStorage is not available:', error);
            return false;
        }
    }
    
    /**
     * Get current storage usage information
     */
    getStorageInfo() {
        if (!this.isStorageAvailable()) {
            return { available: false, used: 0, remaining: 0, percentage: 0 };
        }
        
        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }
            
            const usedBytes = totalSize * 2; // UTF-16 encoding
            const remainingBytes = this.maxStorageSize - usedBytes;
            const percentage = (usedBytes / this.maxStorageSize) * 100;
            
            return {
                available: true,
                used: usedBytes,
                remaining: Math.max(0, remainingBytes),
                percentage: Math.min(100, percentage),
                maxSize: this.maxStorageSize
            };
        } catch (error) {
            console.error('Error calculating storage info:', error);
            return { available: false, used: 0, remaining: 0, percentage: 0 };
        }
    }
    
    /**
     * Check if there's enough storage space for data
     */
    hasEnoughSpace(dataSize) {
        const storageInfo = this.getStorageInfo();
        return storageInfo.available && storageInfo.remaining > dataSize;
    }
    
    /**
     * Compress data using simple JSON compression techniques
     */
    compressData(data) {
        if (!this.compressionEnabled) return data;
        
        try {
            // Simple compression: remove unnecessary whitespace and optimize structure
            const jsonString = JSON.stringify(data);
            
            // Basic compression techniques
            let compressed = jsonString
                .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                .replace(/,\s*}/g, '}') // Remove trailing commas before closing braces
                .replace(/,\s*]/g, ']') // Remove trailing commas before closing brackets
                .trim();
            
            return compressed;
        } catch (error) {
            console.warn('Data compression failed, using uncompressed data:', error);
            return JSON.stringify(data);
        }
    }
    
    /**
     * Decompress data
     */
    decompressData(compressedData) {
        try {
            // If it's already an object, return as-is
            if (typeof compressedData === 'object') {
                return compressedData;
            }
            
            // Parse JSON string
            return JSON.parse(compressedData);
        } catch (error) {
            console.error('Data decompression failed:', error);
            throw new Error('Failed to decompress stored data');
        }
    }
    
    /**
     * Save data to localStorage with versioning and error handling
     */
    saveData(data, options = {}) {
        if (!this.isStorageAvailable()) {
            throw new Error('localStorage is not available');
        }
        
        try {
            // Prepare data with metadata
            const dataWithMetadata = {
                version: this.currentVersion,
                timestamp: new Date().toISOString(),
                data: data,
                checksum: this.generateChecksum(data)
            };
            
            // Compress data if enabled
            const serializedData = this.compressData(dataWithMetadata);
            const dataSize = serializedData.length * 2; // UTF-16 encoding
            
            // Check storage space
            if (!this.hasEnoughSpace(dataSize)) {
                throw new Error('Insufficient storage space. Consider clearing old data or reducing data size.');
            }
            
            // Save to localStorage
            localStorage.setItem(this.storageKey, serializedData);
            localStorage.setItem(this.versionKey, this.currentVersion);
            
            console.log(`Data saved successfully. Size: ${(dataSize / 1024).toFixed(2)}KB`);
            
            return {
                success: true,
                size: dataSize,
                timestamp: dataWithMetadata.timestamp
            };
            
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
            
            // Handle specific storage errors
            if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                throw new Error('Storage quota exceeded. Please clear some data and try again.');
            }
            
            throw new Error(`Failed to save data: ${error.message}`);
        }
    }
    
    /**
     * Load data from localStorage with migration support
     */
    loadData() {
        if (!this.isStorageAvailable()) {
            throw new Error('localStorage is not available');
        }
        
        try {
            const serializedData = localStorage.getItem(this.storageKey);
            const storedVersion = localStorage.getItem(this.versionKey);
            
            if (!serializedData) {
                return null; // No data stored
            }
            
            // Decompress and parse data
            const dataWithMetadata = this.decompressData(serializedData);
            
            // Validate data integrity
            if (!this.validateData(dataWithMetadata)) {
                throw new Error('Stored data is corrupted or invalid');
            }
            
            // Handle version migration if needed
            let migratedData = dataWithMetadata.data;
            if (storedVersion && storedVersion !== this.currentVersion) {
                migratedData = this.migrateData(dataWithMetadata.data, storedVersion, this.currentVersion);
            }
            
            console.log('Data loaded successfully from localStorage');
            
            return {
                data: migratedData,
                metadata: {
                    version: dataWithMetadata.version || storedVersion,
                    timestamp: dataWithMetadata.timestamp,
                    migrated: storedVersion !== this.currentVersion
                }
            };
            
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            throw new Error(`Failed to load data: ${error.message}`);
        }
    }
    
    /**
     * Generate a simple checksum for data integrity
     */
    generateChecksum(data) {
        const jsonString = JSON.stringify(data);
        let hash = 0;
        
        for (let i = 0; i < jsonString.length; i++) {
            const char = jsonString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return hash.toString(36);
    }
    
    /**
     * Validate stored data integrity
     */
    validateData(dataWithMetadata) {
        try {
            // Check required fields
            if (!dataWithMetadata || typeof dataWithMetadata !== 'object') {
                return false;
            }
            
            if (!dataWithMetadata.data || !dataWithMetadata.timestamp) {
                return false;
            }
            
            // Validate checksum if present
            if (dataWithMetadata.checksum) {
                const calculatedChecksum = this.generateChecksum(dataWithMetadata.data);
                if (calculatedChecksum !== dataWithMetadata.checksum) {
                    console.warn('Data checksum mismatch - data may be corrupted');
                    return false;
                }
            }
            
            return true;
        } catch (error) {
            console.error('Error validating data:', error);
            return false;
        }
    }
    
    /**
     * Setup migration handlers for different versions
     */
    setupMigrationHandlers() {
        // Example migration from version 0.9.0 to 1.0.0
        this.migrationHandlers.set('0.9.0->1.0.0', (data) => {
            // Add any necessary data structure changes here
            console.log('Migrating data from 0.9.0 to 1.0.0');
            return data;
        });
        
        // Future migration handlers can be added here
    }
    
    /**
     * Migrate data between versions
     */
    migrateData(data, fromVersion, toVersion) {
        console.log(`Migrating data from version ${fromVersion} to ${toVersion}`);
        
        try {
            let migratedData = data;
            const migrationKey = `${fromVersion}->${toVersion}`;
            
            if (this.migrationHandlers.has(migrationKey)) {
                migratedData = this.migrationHandlers.get(migrationKey)(data);
                console.log('Data migration completed successfully');
            } else {
                console.warn(`No migration handler found for ${migrationKey}, using data as-is`);
            }
            
            return migratedData;
        } catch (error) {
            console.error('Error during data migration:', error);
            throw new Error(`Data migration failed: ${error.message}`);
        }
    }
    
    /**
     * Clear all stored data
     */
    clearData() {
        if (!this.isStorageAvailable()) {
            throw new Error('localStorage is not available');
        }
        
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.versionKey);
            console.log('All stored data cleared successfully');
            return true;
        } catch (error) {
            console.error('Error clearing stored data:', error);
            throw new Error(`Failed to clear data: ${error.message}`);
        }
    }
    
    /**
     * Create a backup of current data
     */
    createBackup() {
        try {
            const loadResult = this.loadData();
            if (!loadResult) {
                throw new Error('No data to backup');
            }
            
            const backup = {
                ...loadResult,
                backupTimestamp: new Date().toISOString(),
                backupVersion: this.currentVersion
            };
            
            return backup;
        } catch (error) {
            console.error('Error creating backup:', error);
            throw new Error(`Failed to create backup: ${error.message}`);
        }
    }
    
    /**
     * Restore data from backup
     */
    restoreFromBackup(backup) {
        try {
            if (!backup || !backup.data) {
                throw new Error('Invalid backup data');
            }
            
            // Validate backup structure
            if (!backup.backupTimestamp || !backup.backupVersion) {
                throw new Error('Backup metadata is missing or invalid');
            }
            
            // Save the backup data
            const saveResult = this.saveData(backup.data);
            console.log('Data restored from backup successfully');
            
            return saveResult;
        } catch (error) {
            console.error('Error restoring from backup:', error);
            throw new Error(`Failed to restore from backup: ${error.message}`);
        }
    }
    
    /**
     * Export data for external backup
     */
    exportForBackup() {
        try {
            const loadResult = this.loadData();
            if (!loadResult) {
                return null;
            }
            
            const exportData = {
                ...loadResult,
                exportTimestamp: new Date().toISOString(),
                exportVersion: this.currentVersion,
                application: 'SOP Generator'
            };
            
            return JSON.stringify(exportData, null, 2);
        } catch (error) {
            console.error('Error exporting data:', error);
            throw new Error(`Failed to export data: ${error.message}`);
        }
    }
    
    /**
     * Import data from external backup
     */
    importFromBackup(importData) {
        try {
            let parsedData;
            
            // Parse if it's a string
            if (typeof importData === 'string') {
                parsedData = JSON.parse(importData);
            } else {
                parsedData = importData;
            }
            
            // Validate import structure
            if (!parsedData.data || !parsedData.exportTimestamp) {
                throw new Error('Invalid import data structure');
            }
            
            // Save the imported data
            const saveResult = this.saveData(parsedData.data);
            console.log('Data imported successfully');
            
            return saveResult;
        } catch (error) {
            console.error('Error importing data:', error);
            throw new Error(`Failed to import data: ${error.message}`);
        }
    }
}

// State Management
/**
 * Application State Manager
 */
class StateManager {
    constructor() {
        this.state = {
            // Database collections
            parts: new Map(),
            tools: new Map(),
            fixtures: new Map(),
            safety: new Map(),
            
            // Current SOP being created/edited
            currentSOP: new SOP(),
            
            // UI state
            currentSection: 0,
            isDirty: false, // Has unsaved changes
            lastSaved: null,
            
            // Form validation state
            validationErrors: new Map(),
            
            // Search and filter state
            searchFilters: {
                parts: '',
                tools: '',
                fixtures: ''
            },
            
            // Selection state for BOM/Tools/Fixtures
            selectedItems: {
                parts: new Set(),
                tools: new Set(),
                fixtures: new Set()
            }
        };
        
        this.listeners = new Map();
        this.storageService = new StorageService();
        this.initialize();
    }
    
    initialize() {
        try {
            // Load data from localStorage if available
            this.loadFromStorage();
            
            // Set up auto-save
            this.setupAutoSave();
            
            console.log('State Manager initialized successfully');
        } catch (error) {
            console.error('Error initializing State Manager:', error);
            // Continue with empty state if there's an error
            this.state.currentSOP = new SOP();
            console.log('State Manager initialized with empty state due to error');
        }
    }
    
    // Event system for state changes
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
    
    // Database operations
    addPart(partData) {
        try {
            const part = new Part(partData);
            this.state.parts.set(part.id, part);
            this.markDirty();
            this.emit('partAdded', part);
            return part;
        } catch (error) {
            this.emit('error', { type: 'validation', message: error.message });
            throw error;
        }
    }
    
    updatePart(partId, partData) {
        const part = this.state.parts.get(partId);
        if (part) {
            try {
                part.update(partData);
                this.markDirty();
                this.emit('partUpdated', part);
                return part;
            } catch (error) {
                this.emit('error', { type: 'validation', message: error.message });
                throw error;
            }
        }
        throw new Error('Part not found');
    }
    
    removePart(partId) {
        if (this.state.parts.has(partId)) {
            const part = this.state.parts.get(partId);
            this.state.parts.delete(partId);
            this.markDirty();
            this.emit('partRemoved', part);
            return true;
        }
        return false;
    }
    
    getPart(partId) {
        return this.state.parts.get(partId);
    }
    
    getAllParts() {
        return Array.from(this.state.parts.values());
    }
    
    addTool(toolData) {
        try {
            const tool = new Tool(toolData);
            this.state.tools.set(tool.id, tool);
            this.markDirty();
            this.emit('toolAdded', tool);
            return tool;
        } catch (error) {
            this.emit('error', { type: 'validation', message: error.message });
            throw error;
        }
    }
    
    updateTool(toolId, toolData) {
        const tool = this.state.tools.get(toolId);
        if (tool) {
            try {
                tool.update(toolData);
                this.markDirty();
                this.emit('toolUpdated', tool);
                return tool;
            } catch (error) {
                this.emit('error', { type: 'validation', message: error.message });
                throw error;
            }
        }
        throw new Error('Tool not found');
    }
    
    removeTool(toolId) {
        if (this.state.tools.has(toolId)) {
            const tool = this.state.tools.get(toolId);
            this.state.tools.delete(toolId);
            this.markDirty();
            this.emit('toolRemoved', tool);
            return true;
        }
        return false;
    }
    
    getTool(toolId) {
        return this.state.tools.get(toolId);
    }
    
    getAllTools() {
        return Array.from(this.state.tools.values());
    }
    
    addFixture(fixtureData) {
        try {
            const fixture = new Fixture(fixtureData);
            this.state.fixtures.set(fixture.id, fixture);
            this.markDirty();
            this.emit('fixtureAdded', fixture);
            return fixture;
        } catch (error) {
            this.emit('error', { type: 'validation', message: error.message });
            throw error;
        }
    }
    
    updateFixture(fixtureId, fixtureData) {
        const fixture = this.state.fixtures.get(fixtureId);
        if (fixture) {
            try {
                fixture.update(fixtureData);
                this.markDirty();
                this.emit('fixtureUpdated', fixture);
                return fixture;
            } catch (error) {
                this.emit('error', { type: 'validation', message: error.message });
                throw error;
            }
        }
        throw new Error('Fixture not found');
    }
    
    removeFixture(fixtureId) {
        if (this.state.fixtures.has(fixtureId)) {
            const fixture = this.state.fixtures.get(fixtureId);
            this.state.fixtures.delete(fixtureId);
            this.markDirty();
            this.emit('fixtureRemoved', fixture);
            return true;
        }
        return false;
    }
    
    getFixture(fixtureId) {
        return this.state.fixtures.get(fixtureId);
    }
    
    getAllFixtures() {
        return Array.from(this.state.fixtures.values());
    }
    
    addSafety(safetyData) {
        try {
            const safety = new Safety(safetyData);
            this.state.safety.set(safety.id, safety);
            this.markDirty();
            this.emit('safetyAdded', safety);
            return safety;
        } catch (error) {
            this.emit('error', { type: 'validation', message: error.message });
            throw error;
        }
    }
    
    updateSafety(safetyId, safetyData) {
        const safety = this.state.safety.get(safetyId);
        if (safety) {
            try {
                safety.update(safetyData);
                this.markDirty();
                this.emit('safetyUpdated', safety);
                return safety;
            } catch (error) {
                this.emit('error', { type: 'validation', message: error.message });
                throw error;
            }
        }
        throw new Error('Safety item not found');
    }
    
    removeSafety(safetyId) {
        if (this.state.safety.has(safetyId)) {
            const safety = this.state.safety.get(safetyId);
            this.state.safety.delete(safetyId);
            this.markDirty();
            this.emit('safetyRemoved', safety);
            return true;
        }
        return false;
    }
    
    getSafety(safetyId) {
        return this.state.safety.get(safetyId);
    }
    
    getAllSafety() {
        return Array.from(this.state.safety.values());
    }
    
    // SOP operations
    updateCurrentSOP(sopData) {
        try {
            this.state.currentSOP.update(sopData);
            this.markDirty();
            this.emit('sopUpdated', this.state.currentSOP);
        } catch (error) {
            this.emit('error', { type: 'validation', message: error.message });
            throw error;
        }
    }
    
    getCurrentSOP() {
        return this.state.currentSOP;
    }
    
    resetCurrentSOP() {
        this.state.currentSOP = new SOP();
        this.markDirty();
        this.emit('sopReset', this.state.currentSOP);
    }
    
    // Search and filter operations
    setSearchFilter(type, filter) {
        this.state.searchFilters[type] = filter;
        this.emit('searchFilterChanged', { type, filter });
    }
    
    getSearchFilter(type) {
        return this.state.searchFilters[type];
    }
    
    // Selection operations
    selectItem(type, itemId) {
        this.state.selectedItems[type].add(itemId);
        this.emit('itemSelected', { type, itemId });
    }
    
    deselectItem(type, itemId) {
        this.state.selectedItems[type].delete(itemId);
        this.emit('itemDeselected', { type, itemId });
    }
    
    clearSelection(type) {
        this.state.selectedItems[type].clear();
        this.emit('selectionCleared', { type });
    }
    
    getSelectedItems(type) {
        return Array.from(this.state.selectedItems[type]);
    }
    
    isItemSelected(type, itemId) {
        return this.state.selectedItems[type].has(itemId);
    }
    
    // Validation operations
    setValidationError(field, error) {
        this.state.validationErrors.set(field, error);
        this.emit('validationError', { field, error });
    }
    
    clearValidationError(field) {
        this.state.validationErrors.delete(field);
        this.emit('validationErrorCleared', { field });
    }
    
    getValidationError(field) {
        return this.state.validationErrors.get(field);
    }
    
    hasValidationErrors() {
        return this.state.validationErrors.size > 0;
    }
    
    // State persistence
    markDirty() {
        this.state.isDirty = true;
        this.emit('stateChanged', this.state);
    }
    
    markClean() {
        this.state.isDirty = false;
        this.state.lastSaved = new Date().toISOString();
        this.emit('stateSaved', this.state);
    }
    
    isDirty() {
        return this.state.isDirty;
    }
    
    saveToStorage() {
        try {
            const dataToSave = {
                parts: Array.from(this.state.parts.entries()),
                tools: Array.from(this.state.tools.entries()),
                fixtures: Array.from(this.state.fixtures.entries()),
                safety: Array.from(this.state.safety.entries()),
                currentSOP: this.state.currentSOP.toJSON(),
                lastSaved: new Date().toISOString()
            };
            
            const result = this.storageService.saveData(dataToSave);
            this.markClean();
            this.emit('dataSaved', result);
            console.log('Data saved to localStorage via StorageService');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.emit('error', { type: 'storage', message: error.message });
        }
    }
    
    loadFromStorage() {
        try {
            const loadResult = this.storageService.loadData();
            
            if (!loadResult) {
                console.log('No saved data found');
                return;
            }
            
            const { data, metadata } = loadResult;
            
            // Load parts
            if (data.parts) {
                data.parts.forEach(([id, partData]) => {
                    this.state.parts.set(id, new Part(partData));
                });
            }
            
            // Load tools
            if (data.tools) {
                data.tools.forEach(([id, toolData]) => {
                    this.state.tools.set(id, new Tool(toolData));
                });
            }
            
            // Load fixtures
            if (data.fixtures && Array.isArray(data.fixtures)) {
                this.state.fixtures.clear();
                data.fixtures.forEach(([id, fixtureData]) => {
                    try {
                        const fixture = new Fixture(fixtureData);
                        this.state.fixtures.set(id, fixture);
                    } catch (error) {
                        console.warn('Failed to load fixture:', error);
                    }
                });
            }
            
            // Load safety items
            if (data.safety && Array.isArray(data.safety)) {
                this.state.safety.clear();
                data.safety.forEach(([id, safetyData]) => {
                    try {
                        const safety = new Safety(safetyData);
                        this.state.safety.set(id, safety);
                    } catch (error) {
                        console.warn('Failed to load safety item:', error);
                    }
                });
            }
            
            // Load current SOP
            if (data.currentSOP) {
                this.state.currentSOP = new SOP(data.currentSOP);
            }
            
            this.state.lastSaved = data.lastSaved;
            
            // Emit events for successful load
            this.emit('dataLoaded', { data, metadata });
            
            if (metadata.migrated) {
                this.emit('dataMigrated', metadata);
                console.log(`Data migrated from version ${metadata.version}`);
            }
            
            console.log('Data loaded from localStorage via StorageService');
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.emit('error', { type: 'storage', message: error.message });
        }
    }
    
    setupAutoSave() {
        // Auto-save every 30 seconds if there are changes
        setInterval(() => {
            if (this.state.isDirty) {
                this.saveToStorage();
            }
        }, 30000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => {
            if (this.state.isDirty) {
                this.saveToStorage();
            }
        });
    }
    
    // Enhanced Storage Management Methods
    
    /**
     * Get storage usage information
     */
    getStorageInfo() {
        return this.storageService.getStorageInfo();
    }
    
    /**
     * Check if storage is available
     */
    isStorageAvailable() {
        return this.storageService.isStorageAvailable();
    }
    
    /**
     * Clear all stored data
     */
    clearStoredData() {
        try {
            this.storageService.clearData();
            
            // Reset current state
            this.state.parts.clear();
            this.state.tools.clear();
            this.state.fixtures.clear();
            this.state.safety.clear();
            this.state.currentSOP = new SOP();
            this.state.lastSaved = null;
            
            this.markDirty();
            this.emit('dataCleared');
            console.log('All data cleared successfully');
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            this.emit('error', { type: 'storage', message: error.message });
            return false;
        }
    }
    
    /**
     * Create a backup of current data
     */
    createBackup() {
        try {
            // Save current state first if dirty
            if (this.state.isDirty) {
                this.saveToStorage();
            }
            
            const backup = this.storageService.createBackup();
            this.emit('backupCreated', backup);
            console.log('Backup created successfully');
            return backup;
        } catch (error) {
            console.error('Error creating backup:', error);
            this.emit('error', { type: 'backup', message: error.message });
            throw error;
        }
    }
    
    /**
     * Restore data from backup
     */
    restoreFromBackup(backup) {
        try {
            const result = this.storageService.restoreFromBackup(backup);
            
            // Reload data from storage
            this.loadFromStorage();
            
            this.emit('dataRestored', result);
            console.log('Data restored from backup successfully');
            return result;
        } catch (error) {
            console.error('Error restoring from backup:', error);
            this.emit('error', { type: 'backup', message: error.message });
            throw error;
        }
    }
    
    /**
     * Export data for external backup
     */
    exportData() {
        try {
            // Save current state first if dirty
            if (this.state.isDirty) {
                this.saveToStorage();
            }
            
            const exportString = this.storageService.exportForBackup();
            
            if (!exportString) {
                // Fallback to current state export
                return {
                    parts: this.getAllParts().map(part => part.toJSON()),
                    tools: this.getAllTools().map(tool => tool.toJSON()),
                    fixtures: this.getAllFixtures().map(fixture => fixture.toJSON()),
                    currentSOP: this.state.currentSOP.toJSON(),
                    exportedAt: new Date().toISOString(),
                    application: 'SOP Generator',
                    version: '1.0.0'
                };
            }
            
            this.emit('dataExported');
            return exportString;
        } catch (error) {
            console.error('Error exporting data:', error);
            this.emit('error', { type: 'export', message: error.message });
            throw error;
        }
    }
    
    /**
     * Import data from external backup
     */
    importData(data) {
        try {
            // Try to import using StorageService first
            if (typeof data === 'string' || (data.exportTimestamp && data.application)) {
                const result = this.storageService.importFromBackup(data);
                this.loadFromStorage();
                this.emit('dataImported', result);
                console.log('Data imported via StorageService successfully');
                return result;
            }
            
            // Fallback to legacy import method
            // Clear existing data
            this.state.parts.clear();
            this.state.tools.clear();
            this.state.fixtures.clear();
            
            // Import parts
            if (data.parts) {
                data.parts.forEach(partData => {
                    const part = new Part(partData);
                    this.state.parts.set(part.id, part);
                });
            }
            
            // Import tools
            if (data.tools) {
                data.tools.forEach(toolData => {
                    const tool = new Tool(toolData);
                    this.state.tools.set(tool.id, tool);
                });
            }
            
            // Import fixtures
            if (data.fixtures) {
                data.fixtures.forEach(fixtureData => {
                    const fixture = new Fixture(fixtureData);
                    this.state.fixtures.set(fixture.id, fixture);
                });
            }
            
            // Import current SOP
            if (data.currentSOP) {
                this.state.currentSOP = new SOP(data.currentSOP);
            }
            
            this.markDirty();
            this.emit('dataImported', data);
            console.log('Data imported successfully (legacy method)');
            return { success: true, method: 'legacy' };
        } catch (error) {
            console.error('Error importing data:', error);
            this.emit('error', { type: 'import', message: error.message });
            throw error;
        }
    }
    
    /**
     * Get storage statistics and health information
     */
    getStorageStats() {
        try {
            const storageInfo = this.getStorageInfo();
            const stats = {
                storage: storageInfo,
                data: {
                    partsCount: this.state.parts.size,
                    toolsCount: this.state.tools.size,
                    fixturesCount: this.state.fixtures.size,
                    hasCurrentSOP: !!this.state.currentSOP.title,
                    lastSaved: this.state.lastSaved,
                    isDirty: this.state.isDirty
                },
                health: {
                    storageAvailable: storageInfo.available,
                    storageHealthy: storageInfo.percentage < 80, // Consider unhealthy if >80% full
                    hasBackupCapability: storageInfo.available && storageInfo.remaining > 1024 // At least 1KB for backup
                }
            };
            
            return stats;
        } catch (error) {
            console.error('Error getting storage stats:', error);
            return {
                storage: { available: false },
                data: {},
                health: { storageAvailable: false, storageHealthy: false, hasBackupCapability: false }
            };
        }
    }
}

/**
 * Mock Data Generator - Creates realistic test data for development and testing
 */
class MockDataGenerator {
    constructor(stateManager) {
        this.stateManager = stateManager;
    }
    
    /**
     * Generate comprehensive mock data for all entities
     */
    generateAllMockData() {
        console.log('🎭 Generating comprehensive mock data...');
        
        try {
            // Clear existing data first
            this.stateManager.clearStoredData();
            
            // Generate mock data
            const parts = this.generateMockParts();
            const tools = this.generateMockTools();
            const fixtures = this.generateMockFixtures();
            const safety = this.generateMockSafety();
            const sop = this.generateMockSOP(parts, tools, fixtures);
            
            // Save to storage
            this.stateManager.saveToStorage();
            
            console.log('✅ Mock data generation completed successfully');
            console.log(`Generated: ${parts.length} parts, ${tools.length} tools, ${fixtures.length} fixtures, ${safety.length} safety items, 1 SOP`);
            
            return {
                parts: parts.length,
                tools: tools.length,
                fixtures: fixtures.length,
                sop: !!sop
            };
        } catch (error) {
            console.error('❌ Error generating mock data:', error);
            throw error;
        }
    }
    
    /**
     * Generate mock parts data
     */
    generateMockParts() {
        const mockParts = [
            {
                name: 'Main Circuit Board',
                partNumber: 'PCB-001',
                description: 'Primary circuit board with microcontroller and power management',
                specifications: 'Dimensions: 85mm x 55mm, 4-layer PCB, RoHS compliant',
                category: 'electronics'
            },
            {
                name: 'Aluminum Housing',
                partNumber: 'HSG-ALU-001',
                description: 'CNC machined aluminum housing for device enclosure',
                specifications: 'Material: 6061-T6 Aluminum, Anodized finish, IP65 rated',
                category: 'mechanical'
            },
            {
                name: 'LCD Display Module',
                partNumber: 'LCD-128x64',
                description: '128x64 pixel monochrome LCD display with backlight',
                specifications: 'Size: 2.4", Interface: I2C, Operating voltage: 3.3V-5V',
                category: 'electronics'
            },
            {
                name: 'Power Supply Unit',
                partNumber: 'PSU-12V-2A',
                description: '12V 2A switching power supply with universal input',
                specifications: 'Input: 100-240VAC, Output: 12VDC 2A, Efficiency: >85%',
                category: 'electronics'
            },
            {
                name: 'Rubber Gasket',
                partNumber: 'GSK-RUB-001',
                description: 'Waterproof rubber gasket for housing seal',
                specifications: 'Material: EPDM rubber, Shore hardness: 70A, Temperature range: -40°C to +120°C',
                category: 'sealing'
            },
            {
                name: 'Stainless Steel Screws',
                partNumber: 'SCR-SS-M3x8',
                description: 'M3x8mm stainless steel socket head cap screws',
                specifications: 'Material: 316 stainless steel, Thread: M3x0.5, Length: 8mm',
                category: 'fasteners'
            },
            {
                name: 'Status LED Array',
                partNumber: 'LED-RGB-001',
                description: 'RGB LED array for status indication',
                specifications: 'Type: WS2812B, Quantity: 8 LEDs, Operating voltage: 5V',
                category: 'electronics'
            },
            {
                name: 'Cooling Fan',
                partNumber: 'FAN-40x40',
                description: '40mm x 40mm cooling fan for thermal management',
                specifications: 'Size: 40x40x10mm, Voltage: 12V, Speed: 4000 RPM, Noise: <25dB',
                category: 'thermal'
            },
            {
                name: 'Cable Assembly',
                partNumber: 'CBL-PWR-001',
                description: 'Power cable assembly with connector',
                specifications: 'Length: 1.5m, Wire gauge: 18AWG, Connector: IEC C13',
                category: 'cables'
            },
            {
                name: 'Thermal Pad',
                partNumber: 'PAD-THM-001',
                description: 'Thermal interface pad for heat dissipation',
                specifications: 'Thickness: 1mm, Thermal conductivity: 3.0 W/mK, Size: 20x20mm',
                category: 'thermal'
            }
        ];
        
        const generatedParts = [];
        mockParts.forEach(partData => {
            const part = this.stateManager.addPart(partData);
            generatedParts.push(part);
        });
        
        console.log(`✅ Generated ${generatedParts.length} mock parts`);
        return generatedParts;
    }
    
    /**
     * Generate mock tools data
     */
    generateMockTools() {
        const mockTools = [
            {
                name: 'Phillips Head Screwdriver',
                size: 'PH2',
                specifications: 'Magnetic tip, ESD safe handle, Length: 150mm',
                identifier: 'TOOL-PH2-001',
                category: 'hand-tools'
            },
            {
                name: 'Digital Multimeter',
                size: 'Handheld',
                specifications: 'True RMS, 6000 counts, CAT III 600V safety rating',
                identifier: 'TOOL-DMM-001',
                category: 'test-equipment'
            },
            {
                name: 'Torque Wrench',
                size: '1/4" Drive',
                specifications: 'Range: 2-24 Nm, Accuracy: ±3%, Ratcheting head',
                identifier: 'TOOL-TRQ-001',
                category: 'precision-tools'
            },
            {
                name: 'ESD Wrist Strap',
                size: 'Adjustable',
                specifications: '1 MΩ resistor, Coiled cord, Alligator clip',
                identifier: 'TOOL-ESD-001',
                category: 'safety'
            },
            {
                name: 'Soldering Iron',
                size: '40W',
                specifications: 'Temperature controlled, 200-450°C, Ceramic heater',
                identifier: 'TOOL-SOL-001',
                category: 'soldering'
            },
            {
                name: 'Wire Strippers',
                size: '20-30 AWG',
                specifications: 'Precision ground stripping holes, Ergonomic handles',
                identifier: 'TOOL-WS-001',
                category: 'hand-tools'
            },
            {
                name: 'Hot Air Station',
                size: 'Benchtop',
                specifications: 'Temperature: 100-500°C, Airflow: 1-99 L/min, Digital display',
                identifier: 'TOOL-HAS-001',
                category: 'rework'
            },
            {
                name: 'Oscilloscope',
                size: '2-Channel',
                specifications: 'Bandwidth: 100MHz, Sample rate: 1GSa/s, 7" display',
                identifier: 'TOOL-OSC-001',
                category: 'test-equipment'
            },
            {
                name: 'Hex Key Set',
                size: '1.5-10mm',
                specifications: 'Ball end, Chrome vanadium steel, L-shaped keys',
                identifier: 'TOOL-HEX-001',
                category: 'hand-tools'
            },
            {
                name: 'Anti-Static Mat',
                size: '60x90cm',
                specifications: 'Dissipative vinyl, 10^6-10^9 ohms resistance, Grounding snap',
                identifier: 'TOOL-MAT-001',
                category: 'safety'
            }
        ];
        
        const generatedTools = [];
        mockTools.forEach(toolData => {
            const tool = this.stateManager.addTool(toolData);
            generatedTools.push(tool);
        });
        
        console.log(`✅ Generated ${generatedTools.length} mock tools`);
        return generatedTools;
    }
    
    /**
     * Generate mock fixtures data
     */
    generateMockFixtures() {
        const mockFixtures = [
            {
                name: 'PCB Assembly Jig',
                identifier: 'JIG-PCB-001',
                description: 'Custom jig for holding PCB during component assembly',
                category: 'assembly'
            },
            {
                name: 'Housing Alignment Fixture',
                identifier: 'FIX-HSG-001',
                description: 'Precision fixture for aligning housing components during assembly',
                category: 'alignment'
            },
            {
                name: 'Cable Routing Guide',
                identifier: 'GDE-CBL-001',
                description: 'Guide for proper cable routing and strain relief',
                category: 'routing'
            },
            {
                name: 'Test Bed Fixture',
                identifier: 'FIX-TST-001',
                description: 'Automated test fixture with pogo pins for electrical testing',
                category: 'testing'
            },
            {
                name: 'Gasket Installation Tool',
                identifier: 'TOOL-GSK-001',
                description: 'Specialized tool for proper gasket installation without damage',
                category: 'installation'
            },
            {
                name: 'Screw Torque Fixture',
                identifier: 'FIX-TRQ-001',
                description: 'Fixture to ensure consistent screw torque application',
                category: 'fastening'
            },
            {
                name: 'LED Calibration Jig',
                identifier: 'JIG-LED-001',
                description: 'Jig for LED array calibration and color testing',
                category: 'calibration'
            },
            {
                name: 'Final Assembly Stand',
                identifier: 'STD-ASM-001',
                description: 'Rotating stand for final assembly and inspection',
                category: 'assembly'
            }
        ];
        
        const generatedFixtures = [];
        mockFixtures.forEach(fixtureData => {
            const fixture = this.stateManager.addFixture(fixtureData);
            generatedFixtures.push(fixture);
        });
        
        console.log(`✅ Generated ${generatedFixtures.length} mock fixtures`);
        return generatedFixtures;
    }
    
    /**
     * Generate a comprehensive mock SOP
     */
    generateMockSOP(parts, tools, fixtures) {
        // Update current SOP with comprehensive data
        const sopData = {
            title: 'Electronic Device Assembly Procedure',
            partNumber: 'DEVICE-MAIN-001',
            revision: 'B',
            author: 'John Smith',
            department: 'Manufacturing Engineering',
            approver: 'Jane Doe',
            effectiveDate: new Date().toISOString().split('T')[0],
            notes: 'This SOP covers the complete assembly process for the main electronic device. Follow all safety procedures and quality checkpoints.',
            status: 'approved'
        };
        
        this.stateManager.updateCurrentSOP(sopData);
        const currentSOP = this.stateManager.getCurrentSOP();
        
        // Add BOM items (using first 6 parts)
        parts.slice(0, 6).forEach((part, index) => {
            const quantity = index === 0 ? 1 : (index < 3 ? 2 : 4); // Varying quantities
            currentSOP.addBOMItem(part.id, quantity);
        });
        
        // Add tools (using first 5 tools)
        tools.slice(0, 5).forEach(tool => {
            currentSOP.addTool(tool.id);
        });
        
        // Add fixtures (using first 4 fixtures)
        fixtures.slice(0, 4).forEach(fixture => {
            currentSOP.addFixture(fixture.id);
        });
        
        // Add safety requirements
        const safetyRequirements = [
            'Wear ESD wrist strap at all times',
            'Use safety glasses during mechanical assembly',
            'Ensure proper ventilation when soldering',
            'Handle components by edges only',
            'Verify power is disconnected before electrical work'
        ];
        
        safetyRequirements.forEach(requirement => {
            currentSOP.addSafetyRequirement(requirement);
        });
        
        // Add assembly steps
        const assemblySteps = [
            {
                description: 'Prepare work area and verify all components',
                parts: [{ partId: parts[0].id, quantity: 1 }],
                tools: [tools[0].id, tools[3].id], // Screwdriver and ESD strap
                fixtures: [fixtures[0].id], // PCB jig
                qualityCheck: true,
                qualityDescription: 'Verify all components are present and undamaged',
                notes: 'Ensure work area is clean and ESD safe',
                estimatedTime: 10
            },
            {
                description: 'Install main circuit board in housing',
                parts: [
                    { partId: parts[0].id, quantity: 1 }, // PCB
                    { partId: parts[1].id, quantity: 1 }  // Housing
                ],
                tools: [tools[0].id, tools[2].id], // Screwdriver and torque wrench
                fixtures: [fixtures[1].id], // Housing alignment fixture
                qualityCheck: true,
                qualityDescription: 'Check PCB is properly seated and aligned',
                notes: 'Apply thermal compound if required',
                estimatedTime: 15
            },
            {
                description: 'Connect LCD display module',
                parts: [
                    { partId: parts[2].id, quantity: 1 }, // LCD
                    { partId: parts[8].id, quantity: 1 }  // Cable assembly
                ],
                tools: [tools[1].id, tools[5].id], // Multimeter and wire strippers
                fixtures: [fixtures[2].id], // Cable routing guide
                qualityCheck: true,
                qualityDescription: 'Verify display functionality and cable connections',
                notes: 'Test display before final assembly',
                estimatedTime: 20
            },
            {
                description: 'Install power supply and cooling system',
                parts: [
                    { partId: parts[3].id, quantity: 1 }, // PSU
                    { partId: parts[7].id, quantity: 1 }, // Fan
                    { partId: parts[9].id, quantity: 2 }  // Thermal pads
                ],
                tools: [tools[0].id, tools[2].id], // Screwdriver and torque wrench
                fixtures: [fixtures[3].id], // Test bed fixture
                qualityCheck: true,
                qualityDescription: 'Verify power output and cooling fan operation',
                notes: 'Check thermal interface material application',
                estimatedTime: 25
            },
            {
                description: 'Install sealing gasket and close housing',
                parts: [
                    { partId: parts[4].id, quantity: 1 }, // Gasket
                    { partId: parts[5].id, quantity: 8 }  // Screws
                ],
                tools: [tools[2].id], // Torque wrench
                fixtures: [fixtures[4].id, fixtures[5].id], // Gasket tool and torque fixture
                qualityCheck: true,
                qualityDescription: 'Verify gasket seal integrity and screw torque',
                notes: 'Apply specified torque sequence for even sealing',
                estimatedTime: 15
            },
            {
                description: 'Final testing and calibration',
                parts: [{ partId: parts[6].id, quantity: 1 }], // LED array
                tools: [tools[1].id, tools[7].id], // Multimeter and oscilloscope
                fixtures: [fixtures[6].id, fixtures[7].id], // LED calibration jig and assembly stand
                qualityCheck: true,
                qualityDescription: 'Complete functional test and LED calibration',
                notes: 'Document all test results and calibration values',
                estimatedTime: 30
            }
        ];
        
        assemblySteps.forEach(stepData => {
            currentSOP.addStep(stepData);
        });
        
        console.log(`✅ Generated comprehensive mock SOP with ${currentSOP.steps.length} assembly steps`);
        return currentSOP;
    }
    
    /**
     * Generate mock safety data
     */
    generateMockSafety() {
        console.log('🛡️ Generating mock safety data...');
        
        const safetyData = [
            {
                name: 'Safety Glasses',
                identifier: 'PPE-001',
                description: 'ANSI Z87.1 compliant safety glasses with side shields',
                category: 'Personal Protective Equipment',
                severity: 'high',
                pictogram: '👓'
            },
            {
                name: 'Cut-Resistant Gloves',
                identifier: 'PPE-002',
                description: 'Level 3 cut-resistant gloves for handling sharp components',
                category: 'Personal Protective Equipment',
                severity: 'high',
                pictogram: '🧤'
            },
            {
                name: 'Anti-Static Wrist Strap',
                identifier: 'ESD-001',
                description: 'Grounding wrist strap for ESD-sensitive components',
                category: 'ESD Protection',
                severity: 'medium',
                pictogram: '⚡'
            },
            {
                name: 'Hearing Protection',
                identifier: 'PPE-003',
                description: 'Noise-reducing earplugs or earmuffs for loud environments',
                category: 'Personal Protective Equipment',
                severity: 'medium',
                pictogram: '🔇'
            },
            {
                name: 'Chemical Resistant Gloves',
                identifier: 'PPE-004',
                description: 'Nitrile gloves resistant to solvents and adhesives',
                category: 'Personal Protective Equipment',
                severity: 'high',
                pictogram: '🧪'
            },
            {
                name: 'Ventilation Required',
                identifier: 'ENV-001',
                description: 'Adequate ventilation required for fume extraction',
                category: 'Environmental',
                severity: 'high',
                pictogram: '💨'
            },
            {
                name: 'Fire Extinguisher Access',
                identifier: 'FIRE-001',
                description: 'Class C fire extinguisher must be accessible within 25 feet',
                category: 'Fire Safety',
                severity: 'high',
                pictogram: '🧯'
            },
            {
                name: 'First Aid Kit',
                identifier: 'MED-001',
                description: 'Fully stocked first aid kit accessible in work area',
                category: 'Medical',
                severity: 'medium',
                pictogram: '🏥'
            }
        ];
        
        // Add safety items to state manager
        safetyData.forEach(safety => {
            try {
                this.stateManager.addSafety(safety);
            } catch (error) {
                console.warn(`Failed to add safety item ${safety.name}:`, error.message);
            }
        });
        
        console.log(`✅ Generated ${safetyData.length} safety items`);
        return safetyData;
    }
}

/**
 * Safety Model - Represents a safety requirement/item in the database
 */
class Safety {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.name = data.name || '';
        this.identifier = data.identifier || '';
        this.description = data.description || '';
        this.category = data.category || 'general';
        this.pictogram = data.pictogram || ''; // Safety pictogram/icon
        this.severity = data.severity || 'medium'; // low, medium, high, critical
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        
        this.validate();
    }
    
    generateId() {
        return 'safety_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validate() {
        // Only validate if we have some content - allow empty safety items during initialization
        if (this.name.trim() || this.identifier.trim()) {
            if (!this.name.trim()) {
                throw new Error('Safety item name is required');
            }
            if (!this.identifier.trim()) {
                throw new Error('Safety identifier is required');
            }
        }
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
        this.validate();
        return this;
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            identifier: this.identifier,
            description: this.description,
            category: this.category,
            pictogram: this.pictogram,
            severity: this.severity,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// Global state manager instance
const stateManager = new StateManager();

// Global mock data generator instance
const mockDataGenerator = new MockDataGenerator(stateManager);

// Application state
const app = {
    currentSection: 0,
    totalSections: 5, // Updated to 5 sections: Basic Info, BOM, Safety, Assembly, Preview
    sections: ['basic-info', 'bom', 'safety', 'assembly', 'preview-section'], // Updated section IDs
    databaseSection: 'database', // Separate database section
    initialized: false
};

// DOM elements
const elements = {
    prevButton: null,
    nextButton: null,
    generateButton: null,
    progressFill: null,
    currentStepSpan: null,
    previewToggle: null,
    previewPanel: null,
    navToggle: null,
    navList: null,
    currentDateSpan: null
};

/**
 * Initialize the application
 */
function initializeApp() {
    if (app.initialized) return;
    
    // Cache DOM elements
    cacheElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI state
    initializeUI();
    
    app.initialized = true;
    console.log('Assembly SOP Generator initialized');
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements.prevButton = document.getElementById('prev-section');
    elements.nextButton = document.getElementById('next-section');
    elements.generateButton = document.getElementById('generate-sop');
    elements.progressFill = document.querySelector('.progress-fill');
    elements.currentStepSpan = document.getElementById('current-step');
    elements.previewToggle = document.getElementById('preview-toggle');
    elements.previewPanel = document.getElementById('preview-panel');
    elements.navToggle = document.querySelector('.nav-toggle');
    elements.navList = document.getElementById('main-nav');
    elements.currentDateSpan = document.querySelector('.current-date');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Section navigation
    if (elements.prevButton) {
        elements.prevButton.addEventListener('click', () => navigateSection(-1));
    }
    
    if (elements.nextButton) {
        elements.nextButton.addEventListener('click', () => navigateSection(1));
    }
    
    // Preview panel toggle
    if (elements.previewToggle) {
        elements.previewToggle.addEventListener('click', togglePreviewPanel);
    }
    
    // Mobile navigation toggle
    if (elements.navToggle && elements.navList) {
        elements.navToggle.addEventListener('click', () => {
            const isOpen = elements.navList.classList.contains('open');
            
            if (isOpen) {
                elements.navList.classList.remove('open');
                elements.navToggle.setAttribute('aria-expanded', 'false');
            } else {
                elements.navList.classList.add('open');
                elements.navToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.navToggle.contains(e.target) && !elements.navList.contains(e.target)) {
                elements.navList.classList.remove('open');
                elements.navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile nav when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.navList.classList.contains('open')) {
                elements.navList.classList.remove('open');
                elements.navToggle.setAttribute('aria-expanded', 'false');
                elements.navToggle.focus();
            }
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            console.log(`Navigation clicked: ${link.textContent.trim()} (index: ${index})`);
            
            // Check if this is the Database link (first link)
            if (link.classList.contains('nav-link-database')) {
                console.log('Showing Database section');
                // Show database section (separate from main flow)
                showDatabaseSection();
            } else if (index === navLinks.length - 1) {
                console.log('Toggling Preview panel');
                // This is the Preview link (last link in the nav)
                togglePreviewPanel();
            } else {
                // Regular section navigation
                // Navigation structure: Database(0), Basic Info(1), BOM(2), Safety(3), Assembly(4), Preview(5)
                // Main flow sections: Basic Info(0), BOM(1), Safety(2), Assembly(3), Preview(4)
                const sectionIndex = index - 1; // Subtract 1 because Database is first but not in main flow
                console.log(`Navigating to section index: ${sectionIndex} (${app.sections[sectionIndex]})`);
                if (sectionIndex >= 0 && sectionIndex < app.totalSections) {
                    navigateToSection(sectionIndex);
                }
            }
        });
    });
    
    // Generate SOP button
    if (elements.generateButton) {
        elements.generateButton.addEventListener('click', generateSOP);
    }
    
    // Mock data generation buttons
    const generateFullMockDataBtn = document.getElementById('generate-full-mock-data');
    const clearAllDataBtn = document.getElementById('clear-all-data');
    
    if (generateFullMockDataBtn) {
        generateFullMockDataBtn.addEventListener('click', handleGenerateFullMockData);
    }
    
    if (clearAllDataBtn) {
        clearAllDataBtn.addEventListener('click', handleClearAllData);
    }
    
    // Safety selector dropdown
    const safetySelector = document.getElementById('safety-selector');
    if (safetySelector) {
        safetySelector.addEventListener('change', handleSafetySelection);
    }
    
    // Basic Info form event listeners
    setupBasicInfoFormListeners();
    
    // BOM form event listeners
    setupBOMFormListeners();
    
    // Assembly form event listeners
    setupAssemblyFormListeners();
    
    // Modal event listeners
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    
    // Close modal when clicking the X button
    if (modalClose) {
        modalClose.addEventListener('click', hideModal);
    }
    
    // Close modal when clicking Cancel button
    if (modalCancel) {
        modalCancel.addEventListener('click', hideModal);
    }
    
    // Close modal when clicking outside the modal content
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                hideModal();
            }
        });
    }
    
    // Handle Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modalOverlay = document.getElementById('modal-overlay');
            if (modalOverlay && modalOverlay.getAttribute('aria-hidden') === 'false') {
                hideModal();
            }
        }
    });
    
    // Modal confirm button will be handled by specific functions when needed
    if (modalConfirm) {
        modalConfirm.addEventListener('click', () => {
            // This will be overridden by specific handlers when needed
            hideModal();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close preview panel when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.previewPanel && 
            elements.previewPanel.classList.contains('open') && 
            !elements.previewPanel.contains(e.target) && 
            !elements.previewToggle.contains(e.target)) {
            closePreviewPanel();
        }
    });
}

/**
 * Initialize UI state
 */
function initializeUI() {
    // Set current date
    if (elements.currentDateSpan) {
        elements.currentDateSpan.textContent = new Date().toLocaleDateString();
    }
    
    // Update progress and navigation
    updateProgress();
    updateNavigation();
    
    // Show first section (Basic Info)
    showSection(0);
    
    // Initialize storage info display
    updateStorageInfo();
    
    // Initialize database display
    updateDatabaseDisplay();
}

/**
 * Show database section (separate from main flow)
 */
function showDatabaseSection() {
    // Hide all main flow sections
    app.sections.forEach((sectionId, index) => {
        hideSection(index);
    });
    
    // Show database section
    const databaseSection = document.getElementById(app.databaseSection);
    if (databaseSection) {
        databaseSection.classList.add('active');
    }
    
    // Hide navigation controls for database section
    const navigationControls = document.querySelector('.navigation-controls');
    if (navigationControls) {
        navigationControls.style.display = 'none';
    }
    
    // Hide progress bar for database section
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        progressSection.style.display = 'none';
    }
    
    // Update nav link states
    updateNavLinkStatesForDatabase();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Navigate between sections in main flow
 * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
 */
function navigateSection(direction) {
    const newSection = app.currentSection + direction;
    
    if (newSection >= 0 && newSection < app.totalSections) {
        navigateToSection(newSection);
    }
}

/**
 * Navigate to a specific section in main flow
 * @param {number} sectionIndex - Index of the section to navigate to
 */
function navigateToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= app.totalSections) return;
    
    // Hide database section if it's showing
    const databaseSection = document.getElementById(app.databaseSection);
    if (databaseSection) {
        databaseSection.classList.remove('active');
    }
    
    // Show navigation controls and progress bar
    const navigationControls = document.querySelector('.navigation-controls');
    if (navigationControls) {
        navigationControls.style.display = 'flex';
    }
    
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        progressSection.style.display = 'block';
    }
    
    // Hide current section
    hideSection(app.currentSection);
    
    // Update current section
    app.currentSection = sectionIndex;
    
    // Show new section
    showSection(app.currentSection);
    
    // Update UI
    updateProgress();
    updateNavigation();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Show a specific section
 * @param {number} sectionIndex - Index of the section to show
 */
function showSection(sectionIndex) {
    const sectionId = app.sections[sectionIndex];
    const section = document.getElementById(sectionId);
    
    if (section) {
        section.classList.add('active');
        
        // Update navigation link active state
        updateNavLinkStates(sectionIndex);
        
        // Update parts database when BOM section is shown
        if (sectionIndex === 1) { // BOM section
            updatePartsDatabase();
            updateBOMDisplay();
        }
        
        // Update assembly display when Assembly section is shown
        if (sectionIndex === 3) { // Assembly section
            updateAssemblyDisplay();
        }
    }
}

/**
 * Hide a specific section
 * @param {number} sectionIndex - Index of the section to hide
 */
function hideSection(sectionIndex) {
    const sectionId = app.sections[sectionIndex];
    const section = document.getElementById(sectionId);
    
    if (section) {
        section.classList.remove('active');
    }
}

/**
 * Update progress indicator
 */
function updateProgress() {
    const progressPercentage = ((app.currentSection + 1) / app.totalSections) * 100;
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${progressPercentage}%`;
        elements.progressFill.setAttribute('aria-valuenow', progressPercentage);
    }
    
    if (elements.currentStepSpan) {
        elements.currentStepSpan.textContent = app.currentSection + 1;
    }
}

/**
 * Update navigation button states
 */
function updateNavigation() {
    // Previous button
    if (elements.prevButton) {
        elements.prevButton.disabled = app.currentSection === 0;
    }
    
    // Next button and Generate button
    if (app.currentSection === app.totalSections - 1) {
        // Last section - show generate button
        if (elements.nextButton) {
            elements.nextButton.style.display = 'none';
        }
        if (elements.generateButton) {
            elements.generateButton.style.display = 'block';
        }
    } else {
        // Not last section - show next button
        if (elements.nextButton) {
            elements.nextButton.style.display = 'block';
            elements.nextButton.disabled = false;
        }
        if (elements.generateButton) {
            elements.generateButton.style.display = 'none';
        }
    }
}

/**
 * Update navigation link active states for main flow
 * @param {number} activeIndex - Index of the active section
 */
function updateNavLinkStates(activeIndex) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        // Database link (index 0) - remove active
        if (link.classList.contains('nav-link-database')) {
            link.classList.remove('active');
        }
        // Preview link (last link) - remove active
        else if (index === navLinks.length - 1) {
            link.classList.remove('active');
        }
        // Main flow navigation links (Basic Info, BOM, Safety, Assembly)
        else {
            // Navigation structure: Database(0), Basic Info(1), BOM(2), Safety(3), Assembly(4), Preview(5)
            // Main flow sections: Basic Info(0), BOM(1), Safety(2), Assembly(3), Preview(4)
            const sectionIndex = index - 1; // Subtract 1 for database offset
            if (sectionIndex === activeIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

/**
 * Update navigation link active states for database section
 */
function updateNavLinkStatesForDatabase() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        if (link.classList.contains('nav-link-database')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Toggle preview panel
 */
function togglePreviewPanel() {
    if (elements.previewPanel) {
        const isOpen = elements.previewPanel.classList.contains('open');
        
        if (isOpen) {
            closePreviewPanel();
        } else {
            openPreviewPanel();
        }
    }
}

/**
 * Open preview panel
 */
function openPreviewPanel() {
    if (elements.previewPanel) {
        elements.previewPanel.classList.add('open');
        
        if (elements.previewToggle) {
            elements.previewToggle.setAttribute('aria-expanded', 'true');
        }
    }
}

/**
 * Close preview panel
 */
function closePreviewPanel() {
    if (elements.previewPanel) {
        elements.previewPanel.classList.remove('open');
        elements.previewToggle.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardNavigation(e) {
    // Only handle if no input is focused
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA' || 
        document.activeElement.tagName === 'SELECT') {
        return;
    }
    
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            navigateSection(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateSection(1);
            break;
        case 'Escape':
            e.preventDefault();
            closePreviewPanel();
            break;
    }
}

/**
 * Generate SOP (placeholder function)
 */
function generateSOP() {
    console.log('Generate SOP clicked - functionality will be implemented in later tasks');
    
    // Show loading state
    showLoading();
    
    // Simulate processing
    setTimeout(() => {
        hideLoading();
        openPreviewPanel();
        
        // Update preview content (basic placeholder)
        updatePreviewContent();
    }, 1000);
}

/**
 * Show loading overlay
 */
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.setAttribute('aria-hidden', 'false');
    }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Update preview content (placeholder)
 */
function updatePreviewContent() {
    const previewContent = document.getElementById('preview-sop-content');
    if (previewContent) {
        previewContent.innerHTML = `
            <h3>SCOPE</h3>
            <p>This procedure describes the assembly process for the selected components.</p>
            
            <h3>SAFETY REQUIREMENTS</h3>
            <p>⚠️ <strong>WARNING:</strong> Follow all safety guidelines during assembly.</p>
            
            <h3>BILL OF MATERIALS</h3>
            <ul>
                <li>Parts will be listed here based on BOM section</li>
            </ul>
            
            <h3>ASSEMBLY STEPS</h3>
            <p>Assembly steps will be generated based on the documented sequence.</p>
            
            <p><em>Complete all form sections to generate a full SOP preview.</em></p>
        `;
    }
}

/**
 * Utility function to show modal with title and message
 */
function showModal(title, message, showConfirm = false) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');
    
    if (modalOverlay && modalTitle && modalDescription) {
        modalTitle.textContent = title;
        modalDescription.innerHTML = message;
        
        // Show/hide confirm button based on parameter
        if (modalConfirm && modalCancel) {
            if (showConfirm) {
                modalConfirm.style.display = 'inline-block';
                modalCancel.style.display = 'inline-block';
            } else {
                modalConfirm.style.display = 'none';
                modalCancel.textContent = 'Close';
                modalCancel.style.display = 'inline-block';
            }
        }
        
        modalOverlay.setAttribute('aria-hidden', 'false');
        modalOverlay.style.display = 'flex';
        
        // Focus the modal for accessibility
        const modal = modalOverlay.querySelector('.modal');
        if (modal) {
            modal.focus();
        }
    }
}

/**
 * Utility function to hide modal
 */
function hideModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.setAttribute('aria-hidden', 'true');
        modalOverlay.style.display = 'none';
    }
}

/**
 * Handle full mock data generation
 */
function handleGenerateFullMockData() {
    console.log('🎯 Generating full mock data...');
    
    try {
        showLoading();
        updateStorageInfo('Generating comprehensive test data...');
        
        // Generate mock data
        const result = mockDataGenerator.generateAllMockData();
        
        // Update UI
        updateStorageInfo();
        updateDatabaseDisplay();
        
        // Show success message
        showModal('Mock Data Generated', `
            <p>✅ Successfully generated comprehensive test data!</p>
            <div class="storage-stats">
                <div class="storage-stat">
                    <span class="storage-stat-value">${result.parts}</span>
                    <span class="storage-stat-label">Parts</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${result.tools}</span>
                    <span class="storage-stat-label">Tools</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${result.fixtures}</span>
                    <span class="storage-stat-label">Fixtures</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${result.sop ? '1' : '0'}</span>
                    <span class="storage-stat-label">SOP</span>
                </div>
            </div>
            <p><strong>Navigate to the Database section to explore the generated data!</strong></p>
        `);
        
        console.log('✅ Full mock data generation completed');
    } catch (error) {
        console.error('❌ Error generating full mock data:', error);
        showModal('Error', `
            <p>❌ Failed to generate mock data:</p>
            <p><code>${error.message}</code></p>
        `);
    } finally {
        hideLoading();
    }
}

/**
 * Handle clear all data with confirmation
 */
function handleClearAllData() {
    console.log('🗑️ Clear all data requested...');
    
    // Show confirmation modal
    showModal(
        'Clear All Data', 
        'Are you sure you want to clear all data? This action cannot be undone.<br><br>This will remove:<br>• All parts, tools, and fixtures<br>• Current SOP data<br>• All stored information',
        true // Show confirm button
    );
    
    // Override the confirm button handler for this specific action
    const modalConfirm = document.getElementById('modal-confirm');
    if (modalConfirm) {
        // Remove any existing listeners
        const newConfirmButton = modalConfirm.cloneNode(true);
        modalConfirm.parentNode.replaceChild(newConfirmButton, modalConfirm);
        
        // Add new listener for this specific action
        newConfirmButton.addEventListener('click', () => {
            try {
                showLoading();
                updateStorageInfo('Clearing all data...');
                
                // Clear all data
                stateManager.clearStoredData();
                
                // Update UI
                updateStorageInfo();
                updateDatabaseDisplay();
                
                hideModal();
                hideLoading();
                
                // Show success message
                showModal('Data Cleared', 'All data has been successfully cleared from the application.');
                
                console.log('✅ All data cleared successfully');
            } catch (error) {
                console.error('❌ Error clearing data:', error);
                hideModal();
                hideLoading();
                showModal('Error', 'Failed to clear data. Please try again.');
            }
        });
    }
}

/**
 * Update storage information display
 */
function updateStorageInfo(message = null) {
    const storageInfoElement = document.getElementById('storage-info');
    if (!storageInfoElement) return;
    
    if (message) {
        storageInfoElement.innerHTML = `<p style="font-style: italic; color: var(--color-info);">${message}</p>`;
        return;
    }
    
    try {
        const stats = stateManager.getStorageStats();
        const storageInfo = stats.storage;
        const dataInfo = stats.data;
        
        if (!storageInfo.available) {
            storageInfoElement.innerHTML = `
                <p style="color: var(--color-error);">❌ Local storage is not available</p>
            `;
            return;
        }
        
        const usedKB = (storageInfo.used / 1024).toFixed(2);
        const remainingKB = (storageInfo.remaining / 1024).toFixed(2);
        const percentage = storageInfo.percentage.toFixed(1);
        
        storageInfoElement.innerHTML = `
            <div class="storage-stats">
                <div class="storage-stat">
                    <span class="storage-stat-value">${dataInfo.partsCount}</span>
                    <span class="storage-stat-label">Parts</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${dataInfo.toolsCount}</span>
                    <span class="storage-stat-label">Tools</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${dataInfo.fixturesCount}</span>
                    <span class="storage-stat-label">Fixtures</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${usedKB}KB</span>
                    <span class="storage-stat-label">Used</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${percentage}%</span>
                    <span class="storage-stat-label">Storage</span>
                </div>
                <div class="storage-stat">
                    <span class="storage-stat-value">${dataInfo.lastSaved ? '✅' : '❌'}</span>
                    <span class="storage-stat-label">Saved</span>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error updating storage info:', error);
        storageInfoElement.innerHTML = `
            <p style="color: var(--color-error);">❌ Error loading storage information</p>
        `;
    }
}

/**
 * Update database display with current data
 */
function updateDatabaseDisplay() {
    console.log('📊 Updating database display with current data...');
    
    try {
        // Update tools database  
        updateToolsDatabase();
        
        // Update fixtures database
        updateFixturesDatabase();
        
        // Update safety database
        updateSafetyDatabase();
        
        // Update safety selector dropdown
        updateSafetySelector();
        
        // Update selected safety display
        updateSelectedSafety();
        
        // Log current data counts
        const parts = stateManager.getAllParts();
        const tools = stateManager.getAllTools();
        const fixtures = stateManager.getAllFixtures();
        const safety = stateManager.getAllSafety();
        const currentSOP = stateManager.getCurrentSOP();
        
        console.log(`Database updated: ${parts.length} parts, ${tools.length} tools, ${fixtures.length} fixtures, ${safety.length} safety items`);
        console.log(`Current data: ${parts.length} parts, ${tools.length} tools, ${fixtures.length} fixtures, ${safety.length} safety items`);
        console.log(`Current SOP: ${currentSOP.title || 'Untitled'}`);
    } catch (error) {
        console.error('Error updating database display:', error);
    }
}

/**
 * Update tools database display
 */
function updateToolsDatabase() {
    const toolsContainer = document.getElementById('tools-database');
    if (!toolsContainer) return;
    
    const tools = stateManager.getAllTools();
    
    if (tools.length === 0) {
        toolsContainer.innerHTML = '<p class="database-empty">No tools in database</p>';
        return;
    }
    
    toolsContainer.innerHTML = tools.map(tool => `
        <div class="database-item" data-id="${tool.id}">
            <div class="database-item-header">
                <strong>${tool.name}</strong>
                <span class="database-item-number">${tool.identifier}</span>
            </div>
            <div class="database-item-description">${tool.specifications}</div>
            <div class="database-item-category">${tool.category}</div>
        </div>
    `).join('');
}

/**
 * Update fixtures database display
 */
function updateFixturesDatabase() {
    const fixturesContainer = document.getElementById('fixtures-database');
    if (!fixturesContainer) return;
    
    const fixtures = stateManager.getAllFixtures();
    
    if (fixtures.length === 0) {
        fixturesContainer.innerHTML = '<p class="database-empty">No fixtures in database</p>';
        return;
    }
    
    fixturesContainer.innerHTML = fixtures.map(fixture => `
        <div class="database-item" data-id="${fixture.id}">
            <div class="database-item-header">
                <strong>${fixture.name}</strong>
                <span class="database-item-number">${fixture.identifier}</span>
            </div>
            <div class="database-item-description">${fixture.description}</div>
            <div class="database-item-category">${fixture.category}</div>
        </div>
    `).join('');
}

/**
 * Update safety database display
 */
function updateSafetyDatabase() {
    const safetyContainer = document.getElementById('safety-database');
    if (!safetyContainer) return;
    
    const safetyItems = stateManager.getAllSafety();
    
    if (safetyItems.length === 0) {
        safetyContainer.innerHTML = '<p class="database-empty">No safety items in database</p>';
        return;
    }
    
    safetyContainer.innerHTML = safetyItems.map(safety => `
        <div class="database-item" data-id="${safety.id}">
            <div class="database-item-header">
                <strong>${safety.name}</strong>
                <span class="database-item-number">${safety.identifier}</span>
            </div>
            <div class="database-item-description">${safety.description}</div>
            <div class="database-item-meta">
                <span class="database-item-category">${safety.category}</span>
                <span class="database-item-severity severity-${safety.severity}">${safety.severity}</span>
                <span class="database-item-pictogram">${safety.pictogram}</span>
            </div>
        </div>
    `).join('');
}

/**
 * Update safety selector dropdown with available safety items
 */
function updateSafetySelector() {
    const safetySelector = document.getElementById('safety-selector');
    if (!safetySelector) return;
    
    const safetyItems = stateManager.getAllSafety();
    
    // Clear existing options except the first placeholder
    safetySelector.innerHTML = '<option value="">Select safety item to add...</option>';
    
    // Add safety items as options
    safetyItems.forEach(safety => {
        const option = document.createElement('option');
        option.value = safety.id;
        option.textContent = `${safety.pictogram} ${safety.name} (${safety.identifier})`;
        safetySelector.appendChild(option);
    });
}

/**
 * Handle safety item selection from dropdown
 */
function handleSafetySelection(event) {
    const safetyId = event.target.value;
    if (!safetyId) return;
    
    const safety = stateManager.getSafety(safetyId);
    if (!safety) return;
    
    // Add safety item to current SOP
    const currentSOP = stateManager.getCurrentSOP();
    currentSOP.addSafetyRequirement(`${safety.name}: ${safety.description}`);
    
    // Update the selected safety display
    updateSelectedSafety();
    
    // Reset the selector
    event.target.value = '';
    
    // Save changes
    stateManager.saveToStorage();
    
    console.log(`Added safety item: ${safety.name}`);
}

/**
 * Update the selected safety items display
 */
function updateSelectedSafety() {
    const selectedSafetyContainer = document.getElementById('selected-safety');
    if (!selectedSafetyContainer) return;
    
    const currentSOP = stateManager.getCurrentSOP();
    const safetyRequirements = currentSOP.safety || [];
    
    if (safetyRequirements.length === 0) {
        selectedSafetyContainer.innerHTML = '<p class="safety-empty">No safety items selected</p>';
        return;
    }
    
    selectedSafetyContainer.innerHTML = safetyRequirements.map((requirement, index) => `
        <div class="selected-safety-item" data-index="${index}">
            <div class="safety-item-content">
                <span class="safety-requirement-text">${requirement}</span>
            </div>
            <button type="button" class="remove-safety-btn" onclick="removeSafetyRequirement(${index})" aria-label="Remove safety requirement">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    `).join('');
}

/**
 * Remove a safety requirement from the current SOP
 */
function removeSafetyRequirement(index) {
    const currentSOP = stateManager.getCurrentSOP();
    currentSOP.removeSafetyRequirement(currentSOP.safety[index]);
    
    // Update the display
    updateSelectedSafety();
    
    // Save changes
    stateManager.saveToStorage();
    
    console.log(`Removed safety requirement at index: ${index}`);
}

/**
 * Update parts database display (for BOM section)
 */
function updatePartsDatabase() {
    const partsContainer = document.getElementById('parts-database');
    if (!partsContainer) return;
    
    const parts = stateManager.getAllParts();
    
    if (parts.length === 0) {
        partsContainer.innerHTML = '<p class="database-empty">No parts in database</p>';
        return;
    }
    
    partsContainer.innerHTML = parts.map(part => `
        <div class="database-item" data-id="${part.id}">
            <div class="database-item-header">
                <strong>${part.name}</strong>
                <span class="database-item-number">${part.partNumber}</span>
            </div>
            <div class="database-item-description">${part.description}</div>
            <div class="database-item-category">${part.category}</div>
        </div>
    `).join('');
}

/**
 * Setup Basic Info form event listeners
 */
function setupBasicInfoFormListeners() {
    const basicInfoForm = document.getElementById('basic-info-form');
    if (!basicInfoForm) return;
    
    // Get all form inputs
    const formInputs = basicInfoForm.querySelectorAll('input, textarea');
    
    // Add event listeners to each input
    formInputs.forEach(input => {
        // Handle input changes
        input.addEventListener('input', handleBasicInfoInput);
        input.addEventListener('blur', handleBasicInfoBlur);
        
        // Handle validation on form submission attempt
        input.addEventListener('invalid', handleBasicInfoValidation);
    });
    
    // Load existing data into form
    loadBasicInfoData();
    
    console.log('Basic Info form listeners setup complete');
}

/**
 * Handle input changes in Basic Info form
 */
function handleBasicInfoInput(event) {
    const input = event.target;
    const fieldName = input.name;
    const value = input.value;
    
    // Clear any existing validation error
    clearFieldError(input);
    
    // Update the current SOP with the new value
    const currentSOP = stateManager.getCurrentSOP();
    currentSOP[fieldName] = value;
    
    // Mark state as dirty and save
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Updated SOP ${fieldName}: ${value}`);
}

/**
 * Handle blur events for validation
 */
function handleBasicInfoBlur(event) {
    const input = event.target;
    validateBasicInfoField(input);
}

/**
 * Handle validation events
 */
function handleBasicInfoValidation(event) {
    const input = event.target;
    event.preventDefault(); // Prevent default browser validation UI
    validateBasicInfoField(input);
}

/**
 * Validate a specific Basic Info field
 */
function validateBasicInfoField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        errorMessage = `${getFieldDisplayName(fieldName)} is required`;
    }
    
    // Field-specific validation
    switch (fieldName) {
        case 'title':
            if (value && value.length < 3) {
                errorMessage = 'SOP title must be at least 3 characters long';
            }
            break;
        case 'partNumber':
            if (value && !/^[A-Za-z0-9\-_]+$/.test(value)) {
                errorMessage = 'Part number can only contain letters, numbers, hyphens, and underscores';
            }
            break;
        case 'revision':
            if (value && value.length > 10) {
                errorMessage = 'Revision must be 10 characters or less';
            }
            break;
        case 'effectiveDate':
            if (value) {
                const date = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time for comparison
                if (date < today) {
                    errorMessage = 'Effective date cannot be in the past';
                }
            }
            break;
    }
    
    // Display or clear error
    if (errorMessage) {
        showFieldError(input, errorMessage);
        stateManager.setValidationError(fieldName, errorMessage);
    } else {
        clearFieldError(input);
        stateManager.clearValidationError(fieldName);
    }
    
    return !errorMessage;
}

/**
 * Show validation error for a field
 */
function showFieldError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    input.classList.add('form-input--error');
    input.setAttribute('aria-invalid', 'true');
}

/**
 * Clear validation error for a field
 */
function clearFieldError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    input.classList.remove('form-input--error');
    input.setAttribute('aria-invalid', 'false');
}

/**
 * Get display name for a field
 */
function getFieldDisplayName(fieldName) {
    const displayNames = {
        title: 'SOP Title',
        partNumber: 'Part Number',
        revision: 'Revision',
        author: 'Author',
        department: 'Department',
        approver: 'Approver',
        effectiveDate: 'Effective Date',
        notes: 'Notes'
    };
    
    return displayNames[fieldName] || fieldName;
}

/**
 * Load existing Basic Info data into the form
 */
function loadBasicInfoData() {
    const currentSOP = stateManager.getCurrentSOP();
    const basicInfoForm = document.getElementById('basic-info-form');
    
    if (!basicInfoForm || !currentSOP) return;
    
    // Populate form fields with existing data
    const formInputs = basicInfoForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        const fieldName = input.name;
        if (fieldName && currentSOP[fieldName] !== undefined) {
            input.value = currentSOP[fieldName];
        }
    });
    
    console.log('Basic Info data loaded into form');
}

/**
 * Validate all Basic Info fields
 */
function validateBasicInfoForm() {
    const basicInfoForm = document.getElementById('basic-info-form');
    if (!basicInfoForm) return true;
    
    const formInputs = basicInfoForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateBasicInfoField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate the entire Basic Info form
 */
function validateBasicInfoForm() {
    const basicInfoForm = document.getElementById('basic-info-form');
    if (!basicInfoForm) return false;
    
    const formInputs = basicInfoForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateBasicInfoField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Setup BOM form event listeners and functionality
 */
function setupBOMFormListeners() {
    // Setup parts database click handlers
    setupPartsSelectionHandlers();
    
    // Setup add BOM item button
    const addBOMButton = document.getElementById('add-bom-item');
    if (addBOMButton) {
        addBOMButton.addEventListener('click', handleAddBOMItem);
    }
    
    // Setup add new part button
    const addPartButton = document.querySelector('[data-database="parts"]');
    if (addPartButton) {
        addPartButton.addEventListener('click', handleAddNewPart);
    }
    
    // Load existing BOM data
    loadBOMData();
    
    console.log('BOM form listeners setup complete');
}

/**
 * Setup click handlers for parts in the database
 */
function setupPartsSelectionHandlers() {
    const partsContainer = document.getElementById('parts-database');
    if (!partsContainer) return;
    
    // Use event delegation for dynamically added parts
    partsContainer.addEventListener('click', handlePartSelection);
}

/**
 * Handle clicking on a part in the database
 */
function handlePartSelection(event) {
    const partItem = event.target.closest('.database-item');
    if (!partItem) return;
    
    const partId = partItem.dataset.id;
    const part = stateManager.getPart(partId);
    
    if (!part) return;
    
    // Add part to BOM with default quantity of 1
    addPartToBOM(partId, 1);
}

/**
 * Handle adding a BOM item manually
 */
function handleAddBOMItem() {
    // Show modal to select part and quantity
    showBOMItemModal();
}

/**
 * Handle adding a new part to the database
 */
function handleAddNewPart() {
    showAddPartModal();
}

/**
 * Add a part to the BOM
 */
function addPartToBOM(partId, quantity = 1) {
    const currentSOP = stateManager.getCurrentSOP();
    const part = stateManager.getPart(partId);
    
    if (!part) {
        console.error('Part not found:', partId);
        return;
    }
    
    // Check if part is already in BOM
    const existingItem = currentSOP.bom.find(item => item.partId === partId);
    
    if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
    } else {
        // Add new BOM item
        currentSOP.addBOMItem(partId, quantity);
    }
    
    // Update UI and save
    updateBOMDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Added part ${part.name} to BOM with quantity ${quantity}`);
}

/**
 * Remove a part from the BOM
 */
function removePartFromBOM(partId) {
    const currentSOP = stateManager.getCurrentSOP();
    const part = stateManager.getPart(partId);
    
    currentSOP.removeBOMItem(partId);
    
    // Update UI and save
    updateBOMDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Removed part ${part?.name || partId} from BOM`);
}

/**
 * Update BOM item quantity
 */
function updateBOMItemQuantity(partId, newQuantity) {
    const currentSOP = stateManager.getCurrentSOP();
    const bomItem = currentSOP.bom.find(item => item.partId === partId);
    
    if (!bomItem) return;
    
    if (newQuantity <= 0) {
        removePartFromBOM(partId);
        return;
    }
    
    bomItem.quantity = parseInt(newQuantity);
    
    // Update UI and save
    updateBOMDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Updated BOM item ${partId} quantity to ${newQuantity}`);
}

/**
 * Update the BOM display
 */
function updateBOMDisplay() {
    const bomContainer = document.getElementById('bom-container');
    if (!bomContainer) return;
    
    const currentSOP = stateManager.getCurrentSOP();
    const bomItems = currentSOP.bom || [];
    
    if (bomItems.length === 0) {
        bomContainer.innerHTML = `
            <div class="bom-empty">
                <p>No parts added to BOM yet</p>
                <p class="bom-help">Click on parts from the database or use "Add BOM Item" to get started</p>
            </div>
        `;
        return;
    }
    
    bomContainer.innerHTML = bomItems.map(bomItem => {
        const part = stateManager.getPart(bomItem.partId);
        if (!part) return ''; // Skip if part not found
        
        return `
            <div class="bom-item" data-part-id="${bomItem.partId}">
                <div class="bom-item-header">
                    <div class="bom-item-info">
                        <strong class="bom-item-name">${part.name}</strong>
                        <span class="bom-item-number">${part.partNumber}</span>
                    </div>
                    <button type="button" class="bom-item-remove" onclick="removePartFromBOM('${bomItem.partId}')" aria-label="Remove ${part.name} from BOM">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="bom-item-description">${part.description}</div>
                <div class="bom-item-details">
                    <span class="bom-item-category">${part.category}</span>
                    <div class="bom-item-quantity">
                        <label for="quantity-${bomItem.partId}" class="bom-quantity-label">Qty:</label>
                        <input 
                            type="number" 
                            id="quantity-${bomItem.partId}"
                            class="bom-quantity-input" 
                            value="${bomItem.quantity}" 
                            min="1" 
                            max="9999"
                            onchange="updateBOMItemQuantity('${bomItem.partId}', this.value)"
                            aria-label="Quantity for ${part.name}"
                        >
                    </div>
                </div>
            </div>
        `;
    }).filter(html => html).join('');
}

/**
 * Load existing BOM data into the display
 */
function loadBOMData() {
    updateBOMDisplay();
}

/**
 * Show modal for adding BOM item
 */
function showBOMItemModal() {
    const parts = stateManager.getAllParts();
    
    if (parts.length === 0) {
        showModal('No Parts Available', 'Please add parts to the database first before creating a BOM.');
        return;
    }
    
    const partOptions = parts.map(part => 
        `<option value="${part.id}">${part.name} (${part.partNumber})</option>`
    ).join('');
    
    const modalContent = `
        <div class="bom-modal-form">
            <div class="form-group">
                <label for="modal-part-select" class="form-label">Select Part</label>
                <select id="modal-part-select" class="form-select">
                    <option value="">Choose a part...</option>
                    ${partOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="modal-quantity-input" class="form-label">Quantity</label>
                <input 
                    type="number" 
                    id="modal-quantity-input" 
                    class="form-input" 
                    value="1" 
                    min="1" 
                    max="9999"
                >
            </div>
        </div>
    `;
    
    showModal('Add BOM Item', modalContent, true);
    
    // Override confirm button behavior
    const confirmButton = document.getElementById('modal-confirm');
    if (confirmButton) {
        confirmButton.onclick = () => {
            const partSelect = document.getElementById('modal-part-select');
            const quantityInput = document.getElementById('modal-quantity-input');
            
            const partId = partSelect.value;
            const quantity = parseInt(quantityInput.value) || 1;
            
            if (!partId) {
                alert('Please select a part');
                return;
            }
            
            addPartToBOM(partId, quantity);
            hideModal();
        };
    }
}

/**
 * Show modal for adding new part
 */
function showAddPartModal() {
    const modalContent = `
        <div class="add-part-modal-form">
            <div class="form-group">
                <label for="modal-part-name" class="form-label required">Part Name</label>
                <input 
                    type="text" 
                    id="modal-part-name" 
                    class="form-input" 
                    placeholder="Enter part name..."
                    required
                >
            </div>
            <div class="form-group">
                <label for="modal-part-number" class="form-label required">Part Number</label>
                <input 
                    type="text" 
                    id="modal-part-number" 
                    class="form-input" 
                    placeholder="Enter part number..."
                    required
                >
            </div>
            <div class="form-group">
                <label for="modal-part-description" class="form-label">Description</label>
                <textarea 
                    id="modal-part-description" 
                    class="form-textarea" 
                    placeholder="Enter part description..."
                    rows="3"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="modal-part-category" class="form-label">Category</label>
                <select id="modal-part-category" class="form-select">
                    <option value="Hardware">Hardware</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Fasteners">Fasteners</option>
                    <option value="Materials">Materials</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
    `;
    
    showModal('Add New Part', modalContent, true);
    
    // Override confirm button behavior
    const confirmButton = document.getElementById('modal-confirm');
    if (confirmButton) {
        confirmButton.onclick = () => {
            const nameInput = document.getElementById('modal-part-name');
            const numberInput = document.getElementById('modal-part-number');
            const descriptionInput = document.getElementById('modal-part-description');
            const categorySelect = document.getElementById('modal-part-category');
            
            const name = nameInput.value.trim();
            const partNumber = numberInput.value.trim();
            const description = descriptionInput.value.trim();
            const category = categorySelect.value;
            
            if (!name || !partNumber) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create new part
            const newPart = {
                name,
                partNumber,
                description: description || `${name} component`,
                category,
                specifications: {},
                supplier: '',
                cost: 0
            };
            
            try {
                const addedPart = stateManager.addPart(newPart);
                updatePartsDatabase();
                
                // Automatically add to BOM
                addPartToBOM(addedPart.id, 1);
                
                hideModal();
                console.log('Added new part:', addedPart);
            } catch (error) {
                alert('Error adding part: ' + error.message);
            }
        };
    }
}

/**
 * Validate BOM form
 */
function validateBOMForm() {
    const currentSOP = stateManager.getCurrentSOP();
    const bomItems = currentSOP.bom || [];
    
    if (bomItems.length === 0) {
        stateManager.setValidationError('bom', 'At least one part must be added to the BOM');
        return false;
    }
    
    // Validate that all BOM parts exist in database
    for (const bomItem of bomItems) {
        const part = stateManager.getPart(bomItem.partId);
        if (!part) {
            stateManager.setValidationError('bom', `Part ${bomItem.partId} not found in database`);
            return false;
        }
        
        if (bomItem.quantity <= 0) {
            stateManager.setValidationError('bom', `Invalid quantity for part ${part.name}`);
            return false;
        }
    }
    
    stateManager.clearValidationError('bom');
    return true;
}

/**
 * Setup Assembly form event listeners and functionality
 */
function setupAssemblyFormListeners() {
    // Setup add assembly step button
    const addStepButton = document.getElementById('add-assembly-step');
    if (addStepButton) {
        addStepButton.addEventListener('click', handleAddAssemblyStep);
    }
    
    // Load existing assembly data
    loadAssemblyData();
    
    console.log('Assembly form listeners setup complete');
}

/**
 * Handle adding a new assembly step
 */
function handleAddAssemblyStep() {
    showAddAssemblyStepModal();
}

/**
 * Add a new assembly step to the current SOP
 */
function addAssemblyStep(stepData) {
    const currentSOP = stateManager.getCurrentSOP();
    
    // Create step with proper step number
    const stepNumber = currentSOP.steps.length + 1;
    const newStepData = {
        ...stepData,
        stepNumber: stepNumber
    };
    
    const newStep = currentSOP.addStep(newStepData);
    
    // Update UI and save
    updateAssemblyDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Added assembly step ${stepNumber}: ${stepData.description}`);
    return newStep;
}

/**
 * Remove an assembly step from the current SOP
 */
function removeAssemblyStep(stepId) {
    const currentSOP = stateManager.getCurrentSOP();
    const step = currentSOP.steps.find(s => s.id === stepId);
    
    if (!step) return;
    
    currentSOP.removeStep(stepId);
    
    // Update UI and save
    updateAssemblyDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Removed assembly step: ${step.description}`);
}

/**
 * Update an assembly step
 */
function updateAssemblyStep(stepId, updates) {
    const currentSOP = stateManager.getCurrentSOP();
    const step = currentSOP.steps.find(s => s.id === stepId);
    
    if (!step) return;
    
    step.update(updates);
    
    // Update UI and save
    updateAssemblyDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Updated assembly step: ${step.description}`);
}

/**
 * Move assembly step up or down
 */
function moveAssemblyStep(stepId, direction) {
    const currentSOP = stateManager.getCurrentSOP();
    const stepIndex = currentSOP.steps.findIndex(s => s.id === stepId);
    
    if (stepIndex === -1) return;
    
    const newIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    
    if (newIndex < 0 || newIndex >= currentSOP.steps.length) return;
    
    // Swap steps
    [currentSOP.steps[stepIndex], currentSOP.steps[newIndex]] = 
    [currentSOP.steps[newIndex], currentSOP.steps[stepIndex]];
    
    // Reorder step numbers
    currentSOP.reorderSteps();
    
    // Update UI and save
    updateAssemblyDisplay();
    stateManager.markDirty();
    stateManager.saveToStorage();
    
    console.log(`Moved assembly step ${direction}`);
}

/**
 * Update the assembly steps display
 */
function updateAssemblyDisplay() {
    const assemblyContainer = document.getElementById('assembly-steps');
    if (!assemblyContainer) return;
    
    const currentSOP = stateManager.getCurrentSOP();
    const steps = currentSOP.steps || [];
    
    if (steps.length === 0) {
        assemblyContainer.innerHTML = `
            <div class="assembly-empty">
                <p>No assembly steps defined yet</p>
                <p class="assembly-help">Click "Add Assembly Step" to start documenting your assembly process</p>
            </div>
        `;
        return;
    }
    
    assemblyContainer.innerHTML = steps.map((step, index) => {
        const parts = step.parts.map(partRef => {
            const part = stateManager.getPart(partRef.partId);
            return part ? part.name : 'Unknown part';
        }).join(', ');
        
        const tools = step.tools.map(toolId => {
            const tool = stateManager.getTool(toolId);
            return tool ? tool.name : 'Unknown tool';
        }).join(', ');
        
        const fixtures = step.fixtures.map(fixtureId => {
            const fixture = stateManager.getFixture(fixtureId);
            return fixture ? fixture.name : 'Unknown fixture';
        }).join(', ');
        
        const safety = step.safety ? step.safety.join(', ') : '';
        
        return `
            <div class="assembly-step" data-step-id="${step.id}">
                <div class="assembly-step-header">
                    <div class="assembly-step-number">Step ${step.stepNumber}</div>
                    <div class="assembly-step-controls">
                        <button type="button" class="step-control-btn" onclick="moveAssemblyStep('${step.id}', 'up')" 
                                ${index === 0 ? 'disabled' : ''} aria-label="Move step up">
                            <span aria-hidden="true">↑</span>
                        </button>
                        <button type="button" class="step-control-btn" onclick="moveAssemblyStep('${step.id}', 'down')" 
                                ${index === steps.length - 1 ? 'disabled' : ''} aria-label="Move step down">
                            <span aria-hidden="true">↓</span>
                        </button>
                        <button type="button" class="step-control-btn step-edit-btn" onclick="editAssemblyStep('${step.id}')" aria-label="Edit step">
                            <span aria-hidden="true">✏️</span>
                        </button>
                        <button type="button" class="step-control-btn step-remove-btn" onclick="removeAssemblyStep('${step.id}')" aria-label="Remove step">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                </div>
                
                <div class="assembly-step-body">
                    <div class="assembly-step-image">
                        <div class="image-placeholder">
                            <span class="image-placeholder-icon">📷</span>
                            <span class="image-placeholder-text">Step Image</span>
                        </div>
                    </div>
                    
                    <div class="assembly-step-content">
                        <div class="assembly-step-description">
                            <strong>Description:</strong> ${step.description}
                        </div>
                        
                        ${step.parts.length > 0 ? `
                            <div class="assembly-step-parts">
                                <strong>Parts:</strong> ${parts}
                            </div>
                        ` : ''}
                        
                        ${step.tools.length > 0 ? `
                            <div class="assembly-step-tools">
                                <strong>Tools:</strong> ${tools}
                            </div>
                        ` : ''}
                        
                        ${step.fixtures.length > 0 ? `
                            <div class="assembly-step-fixtures">
                                <strong>Fixtures:</strong> ${fixtures}
                            </div>
                        ` : ''}
                        
                        ${safety ? `
                            <div class="assembly-step-safety">
                                <strong>Safety:</strong> ${safety}
                            </div>
                        ` : ''}
                        
                        ${step.estimatedTime > 0 ? `
                            <div class="assembly-step-time">
                                <strong>Estimated Time:</strong> ${step.estimatedTime} minutes
                            </div>
                        ` : ''}
                        
                        ${step.qualityCheck ? `
                            <div class="assembly-step-quality">
                                <strong>Quality Check:</strong> ${step.qualityDescription || 'Required'}
                            </div>
                        ` : ''}
                        
                        ${step.notes ? `
                            <div class="assembly-step-notes">
                                <strong>Notes:</strong> ${step.notes}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Load existing assembly data into the display
 */
function loadAssemblyData() {
    updateAssemblyDisplay();
}

/**
 * Show modal for adding assembly step
 */
function showAddAssemblyStepModal() {
    const parts = stateManager.getAllParts();
    const tools = stateManager.getAllTools();
    const fixtures = stateManager.getAllFixtures();
    const safetyItems = stateManager.getAllSafety();
    
    const partOptions = parts.map(part => 
        `<option value="${part.id}">${part.name} (${part.partNumber})</option>`
    ).join('');
    
    const toolOptions = tools.map(tool => 
        `<option value="${tool.id}">${tool.name} (${tool.identifier})</option>`
    ).join('');
    
    const fixtureOptions = fixtures.map(fixture => 
        `<option value="${fixture.id}">${fixture.name} (${fixture.identifier})</option>`
    ).join('');
    
    const safetyOptions = safetyItems.map(safety => 
        `<option value="${safety.id}">${safety.name} (${safety.identifier})</option>`
    ).join('');
    
    const modalContent = `
        <div class="assembly-step-modal-form">
            <div class="form-group">
                <label for="modal-step-description" class="form-label required">Step Description</label>
                <textarea 
                    id="modal-step-description" 
                    class="form-textarea" 
                    placeholder="Describe what needs to be done in this step..."
                    rows="3"
                    required
                ></textarea>
            </div>
            
            <div class="form-group">
                <label for="modal-step-parts" class="form-label">Parts Used</label>
                <select id="modal-step-parts" class="form-select" multiple>
                    ${partOptions}
                </select>
                <small class="form-help">Hold Ctrl/Cmd to select multiple parts</small>
            </div>
            
            <div class="form-group">
                <label for="modal-step-tools" class="form-label">Tools Required</label>
                <select id="modal-step-tools" class="form-select" multiple>
                    ${toolOptions}
                </select>
                <small class="form-help">Hold Ctrl/Cmd to select multiple tools</small>
            </div>
            
            <div class="form-group">
                <label for="modal-step-fixtures" class="form-label">Fixtures Required</label>
                <select id="modal-step-fixtures" class="form-select" multiple>
                    ${fixtureOptions}
                </select>
                <small class="form-help">Hold Ctrl/Cmd to select multiple fixtures</small>
            </div>
            
            <div class="form-group">
                <label for="modal-step-safety" class="form-label">Safety Requirements</label>
                <select id="modal-step-safety" class="form-select" multiple>
                    ${safetyOptions}
                </select>
                <small class="form-help">Hold Ctrl/Cmd to select multiple safety items</small>
            </div>
            
            <div class="form-group">
                <label for="modal-step-safety-text" class="form-label">Additional Safety Notes</label>
                <textarea 
                    id="modal-step-safety-text" 
                    class="form-textarea" 
                    placeholder="Add any additional safety requirements as free text..."
                    rows="2"
                ></textarea>
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label for="modal-step-time" class="form-label">Estimated Time (minutes)</label>
                    <input 
                        type="number" 
                        id="modal-step-time" 
                        class="form-input" 
                        min="0" 
                        max="999"
                        placeholder="0"
                    >
                </div>
                
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="modal-step-quality" class="form-checkbox">
                        Quality Check Required
                    </label>
                </div>
            </div>
            
            <div class="form-group" id="quality-description-group" style="display: none;">
                <label for="modal-step-quality-desc" class="form-label">Quality Check Description</label>
                <textarea 
                    id="modal-step-quality-desc" 
                    class="form-textarea" 
                    placeholder="Describe the quality check requirements..."
                    rows="2"
                ></textarea>
            </div>
            
            <div class="form-group">
                <label for="modal-step-notes" class="form-label">Additional Notes</label>
                <textarea 
                    id="modal-step-notes" 
                    class="form-textarea" 
                    placeholder="Any additional notes or special instructions..."
                    rows="2"
                ></textarea>
            </div>
        </div>
    `;
    
    showModal('Add Assembly Step', modalContent, true);
    
    // Setup quality check toggle
    const qualityCheckbox = document.getElementById('modal-step-quality');
    const qualityDescGroup = document.getElementById('quality-description-group');
    
    if (qualityCheckbox && qualityDescGroup) {
        qualityCheckbox.addEventListener('change', (e) => {
            qualityDescGroup.style.display = e.target.checked ? 'block' : 'none';
        });
    }
    
    // Override confirm button behavior
    const confirmButton = document.getElementById('modal-confirm');
    if (confirmButton) {
        confirmButton.onclick = () => {
            const description = document.getElementById('modal-step-description').value.trim();
            const partsSelect = document.getElementById('modal-step-parts');
            const toolsSelect = document.getElementById('modal-step-tools');
            const fixturesSelect = document.getElementById('modal-step-fixtures');
            const safetySelect = document.getElementById('modal-step-safety');
            const safetyText = document.getElementById('modal-step-safety-text').value.trim();
            const estimatedTime = parseInt(document.getElementById('modal-step-time').value) || 0;
            const qualityCheck = document.getElementById('modal-step-quality').checked;
            const qualityDescription = document.getElementById('modal-step-quality-desc').value.trim();
            const notes = document.getElementById('modal-step-notes').value.trim();
            
            if (!description) {
                alert('Please provide a step description');
                return;
            }
            
            // Get selected parts with default quantity of 1
            const selectedParts = Array.from(partsSelect.selectedOptions).map(option => ({
                partId: option.value,
                quantity: 1
            }));
            
            // Get selected tools
            const selectedTools = Array.from(toolsSelect.selectedOptions).map(option => option.value);
            
            // Get selected fixtures
            const selectedFixtures = Array.from(fixturesSelect.selectedOptions).map(option => option.value);
            
            // Get selected safety items and combine with free text
            const selectedSafetyItems = Array.from(safetySelect.selectedOptions).map(option => {
                const safety = stateManager.getSafety(option.value);
                return safety ? `${safety.name}: ${safety.description}` : option.textContent;
            });
            
            // Add free text safety notes if provided
            const allSafety = [...selectedSafetyItems];
            if (safetyText) {
                allSafety.push(safetyText);
            }
            
            const stepData = {
                description,
                parts: selectedParts,
                tools: selectedTools,
                fixtures: selectedFixtures,
                safety: allSafety,
                estimatedTime,
                qualityCheck,
                qualityDescription: qualityCheck ? qualityDescription : '',
                notes
            };
            
            addAssemblyStep(stepData);
            hideModal();
        };
    }
}

/**
 * Edit an existing assembly step
 */
function editAssemblyStep(stepId) {
    const currentSOP = stateManager.getCurrentSOP();
    const step = currentSOP.steps.find(s => s.id === stepId);
    
    if (!step) return;
    
    // Show the same modal but pre-populated with existing data
    showAddAssemblyStepModal();
    
    // Pre-populate the form
    setTimeout(() => {
        document.getElementById('modal-step-description').value = step.description;
        document.getElementById('modal-step-time').value = step.estimatedTime || '';
        document.getElementById('modal-step-quality').checked = step.qualityCheck;
        document.getElementById('modal-step-quality-desc').value = step.qualityDescription || '';
        document.getElementById('modal-step-notes').value = step.notes || '';
        
        // Show quality description if quality check is enabled
        const qualityDescGroup = document.getElementById('quality-description-group');
        if (qualityDescGroup) {
            qualityDescGroup.style.display = step.qualityCheck ? 'block' : 'none';
        }
        
        // Select parts, tools, and fixtures
        const partsSelect = document.getElementById('modal-step-parts');
        const toolsSelect = document.getElementById('modal-step-tools');
        const fixturesSelect = document.getElementById('modal-step-fixtures');
        const safetySelect = document.getElementById('modal-step-safety');
        
        step.parts.forEach(partRef => {
            const option = partsSelect.querySelector(`option[value="${partRef.partId}"]`);
            if (option) option.selected = true;
        });
        
        step.tools.forEach(toolId => {
            const option = toolsSelect.querySelector(`option[value="${toolId}"]`);
            if (option) option.selected = true;
        });
        
        step.fixtures.forEach(fixtureId => {
            const option = fixturesSelect.querySelector(`option[value="${fixtureId}"]`);
            if (option) option.selected = true;
        });
        
        // Handle safety requirements - separate database items from free text
        const safetyItems = stateManager.getAllSafety();
        const freeTextSafety = [];
        
        if (step.safety) {
            step.safety.forEach(safetyReq => {
                // Check if this matches a database safety item
                const matchedSafety = safetyItems.find(safety => 
                    safetyReq.includes(safety.name) && safetyReq.includes(safety.description)
                );
                
                if (matchedSafety) {
                    const option = safetySelect.querySelector(`option[value="${matchedSafety.id}"]`);
                    if (option) option.selected = true;
                } else {
                    freeTextSafety.push(safetyReq);
                }
            });
        }
        
        // Set free text safety
        const safetyTextArea = document.getElementById('modal-step-safety-text');
        if (safetyTextArea) {
            safetyTextArea.value = freeTextSafety.join('\n');
        }
        
        // Update modal title
        document.getElementById('modal-title').textContent = `Edit Assembly Step ${step.stepNumber}`;
        
        // Override confirm button to update instead of add
        const confirmButton = document.getElementById('modal-confirm');
        if (confirmButton) {
            confirmButton.onclick = () => {
                const description = document.getElementById('modal-step-description').value.trim();
                const partsSelect = document.getElementById('modal-step-parts');
                const toolsSelect = document.getElementById('modal-step-tools');
                const fixturesSelect = document.getElementById('modal-step-fixtures');
                const safetySelect = document.getElementById('modal-step-safety');
                const safetyText = document.getElementById('modal-step-safety-text').value.trim();
                const estimatedTime = parseInt(document.getElementById('modal-step-time').value) || 0;
                const qualityCheck = document.getElementById('modal-step-quality').checked;
                const qualityDescription = document.getElementById('modal-step-quality-desc').value.trim();
                const notes = document.getElementById('modal-step-notes').value.trim();
                
                if (!description) {
                    alert('Please provide a step description');
                    return;
                }
                
                // Get selected parts with existing quantities (or default to 1)
                const selectedParts = Array.from(partsSelect.selectedOptions).map(option => {
                    const existingPart = step.parts.find(p => p.partId === option.value);
                    return {
                        partId: option.value,
                        quantity: existingPart ? existingPart.quantity : 1
                    };
                });
                
                const selectedTools = Array.from(toolsSelect.selectedOptions).map(option => option.value);
                const selectedFixtures = Array.from(fixturesSelect.selectedOptions).map(option => option.value);
                
                // Get selected safety items and combine with free text
                const selectedSafetyItems = Array.from(safetySelect.selectedOptions).map(option => {
                    const safety = stateManager.getSafety(option.value);
                    return safety ? `${safety.name}: ${safety.description}` : option.textContent;
                });
                
                // Add free text safety notes if provided
                const allSafety = [...selectedSafetyItems];
                if (safetyText) {
                    allSafety.push(safetyText);
                }
                
                const updates = {
                    description,
                    parts: selectedParts,
                    tools: selectedTools,
                    fixtures: selectedFixtures,
                    safety: allSafety,
                    estimatedTime,
                    qualityCheck,
                    qualityDescription: qualityCheck ? qualityDescription : '',
                    notes
                };
                
                updateAssemblyStep(stepId, updates);
                hideModal();
            };
        }
    }, 100);
}

/**
 * Validate assembly form
 */
function validateAssemblyForm() {
    const currentSOP = stateManager.getCurrentSOP();
    const steps = currentSOP.steps || [];
    
    if (steps.length === 0) {
        stateManager.setValidationError('assembly', 'At least one assembly step must be defined');
        return false;
    }
    
    // Validate each step
    for (const step of steps) {
        if (!step.description.trim()) {
            stateManager.setValidationError('assembly', `Step ${step.stepNumber} is missing a description`);
            return false;
        }
    }
    
    stateManager.clearValidationError('assembly');
    return true;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768 && elements.navList) {
        elements.navList.classList.remove('open');
        elements.navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Export functions for potential external use
window.SOPGenerator = {
    navigateToSection,
    showDatabaseSection,
    togglePreviewPanel,
    showModal,
    hideModal,
    generateSOP,
    stateManager, // Add state manager to exports
    
    // Storage utilities for debugging and external access
    storage: {
        getInfo: () => stateManager.getStorageInfo(),
        getStats: () => stateManager.getStorageStats(),
        createBackup: () => stateManager.createBackup(),
        exportData: () => stateManager.exportData(),
        clearData: () => stateManager.clearStoredData(),
        isAvailable: () => stateManager.isStorageAvailable()
    },
    
    // Mock data generator for testing
    mockData: {
        generateAll: () => mockDataGenerator.generateAllMockData(),
        generator: mockDataGenerator
    }
};

// Make safety functions globally accessible for HTML onclick handlers
window.removeSafetyRequirement = removeSafetyRequirement; 
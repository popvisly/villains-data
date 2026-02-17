/**
 * Captori Privacy Framework (APP Compliance)
 * 
 * Implements logic to ensure data handling aligns with the 
 * 13 Australian Privacy Principles (APPs).
 */

export interface APPComplianceHeader {
    'X-Privacy-Standard': 'APP-1.1';
    'X-Data-Minimization': 'Active';
    'X-Collection-Notice': string;
    'X-APP-Mapping': string;
}

/**
 * Generates mandatory privacy headers for API responses.
 * Maps back to APP 1 (Open/Transparent Management) and APP 5 (Notification).
 */
export function getPrivacyHeaders(purpose: string): APPComplianceHeader {
    return {
        'X-Privacy-Standard': 'APP-1.1',
        'X-Data-Minimization': 'Active',
        'X-Collection-Notice': `https://captori.com/privacy?purpose=${encodeURIComponent(purpose)}`,
        'X-APP-Mapping': 'APP-1, APP-3, APP-5, APP-10'
    };
}

/**
 * Data Minimization Utility (APP 3: Collection of solicited personal info)
 * Scrubs unnecessary metadata before storage or transmission.
 */
export function minimizeArtifactData(data: Record<string, unknown>, requiredFields: string[]): Record<string, unknown> {
    const minimized: Record<string, unknown> = {};

    requiredFields.forEach(field => {
        if (data[field] !== undefined) {
            minimized[field] = data[field];
        }
    });

    return minimized;
}

/**
 * APP 10: Correction of personal information.
 * Allows updating a specific field within a signed context.
 */
export function requestCorrection(originalData: Record<string, unknown>, updates: Record<string, unknown>): Record<string, unknown> {
    return { ...originalData, ...updates, correctedAt: new Date().toISOString() };
}

/**
 * Verification for APP 11: Security of personal information.
 */
export function verifyDataSecurity(isEncrypted: boolean, hasAccessControl: boolean): boolean {
    return isEncrypted && hasAccessControl;
}

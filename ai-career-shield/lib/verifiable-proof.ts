/**
 * Verifiable Proof Bridge
 * 
 * Bridges Captori artifacts to W3C Verifiable Credentials standards.
 * Ensures "Proof of Judgment" is portable and cryptographically signed.
 */

export interface VerifiableCredential {
    context: string[];
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: {
        id: string; // User DID or ID
        proofType: 'Judgment' | 'Resilience' | 'Artifact';
        value: string;
        details: Record<string, unknown>;
    };
    proof: {
        type: string;
        created: string;
        proofPurpose: string;
        verificationMethod: string;
        jws: string; // Mock signature for now
    };
}

/**
 * Generates a mock Verifiable Credential for an artifact.
 * Supports "Selective Disclosure" for TCP alignment.
 */
export function generateProofCredential(
    userId: string,
    artifactType: 'Judgment' | 'Resilience' | 'Artifact',
    value: string,
    details: Record<string, unknown>,
    selectiveFields: string[] = []
): VerifiableCredential {
    const now = new Date().toISOString();

    // Implement Selective Disclosure: only include specified fields if provided
    const visibleDetails = selectiveFields.length > 0
        ? Object.fromEntries(Object.entries(details).filter(([key]) => selectiveFields.includes(key)))
        : details;

    return {
        context: ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential', `${artifactType}ProofCredential`],
        issuer: 'did:captori:issuer-01',
        issuanceDate: now,
        credentialSubject: {
            id: `did:captori:user-${userId}`,
            proofType: artifactType,
            value,
            details: visibleDetails
        },
        proof: {
            type: 'Ed25519Signature2018',
            created: now,
            proofPurpose: 'assertionMethod',
            verificationMethod: 'did:captori:key-01',
            jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..mock_signature_captori'
        }
    };
}

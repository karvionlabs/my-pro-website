import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";

const DEFAULT_SECRET =
	process.env.JWT_SECRET ||
	process.env.SESSION_SECRET ||
	"karvion-dev-super-secure-secret-key-32chars";

const encodedSecret = new TextEncoder().encode(DEFAULT_SECRET);

/**
 * Generate a cryptographically secure URL-friendly unique identifier.
 */
export function generateSecureId(size = 21): string {
	return nanoid(size);
}

/**
 * Sign an Edge-compatible JSON Web Token (JWT) using `jose`.
 */
export async function signSessionToken(
	payload: Record<string, unknown>,
	secret = encodedSecret,
	expiration = "7d",
): Promise<string> {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(expiration)
		.setJti(generateSecureId())
		.sign(secret);
}

/**
 * Verify an Edge-compatible JSON Web Token (JWT) using `jose`.
 * Returns payload if valid, or null if expired/tampered.
 */
export async function verifySessionToken<T = Record<string, unknown>>(
	token: string,
	secret = encodedSecret,
): Promise<T | null> {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload as T;
	} catch (_error) {
		return null;
	}
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  verifications?: UserVerification;
  agreedToTerms: boolean;
  profile?: Profile;
  createdEvents: Event[];
  receivedEvents: Event[];
  createdAt: Date;
  updatedAt?: Date;
  profileId?: string;
}

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  country: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
}

export interface UserVerification {
  id: string;
  uniqueString: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt?: Date;
}

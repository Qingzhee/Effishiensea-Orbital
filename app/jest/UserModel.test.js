//Missing test cases for getUserDoc(), getUserDocByUsername() and getUserDocById() as they return Firebase docs.

// Mocks for Firebase Auth and Firestore
jest.mock('./../Firebase/FirebaseConfig', () => ({
    FIREBASE_DB: {},
    FIREBASE_AUTH: {}
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    collection: jest.fn().mockReturnValue({
      query: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getDocs: jest.fn().mockResolvedValue({
        empty: false,
        docs: [{ id: '123', data: () => ({ tokens: 10 }) }]
      }),
      addDoc: jest.fn().mockResolvedValue({ id: '123' }),
    }),
    query: jest.fn(),
    where: jest.fn(),
    // getDocs() returns a promise with a field called docs that is an array of objects (users)
    getDocs: jest.fn().mockResolvedValue({
      empty: false,
      docs: [{ id: '123', data: () => ({ tokens: 10 }) }]
    }),
    updateDoc: jest.fn(),
    increment: jest.fn((value) => `increment(${value})`), // Mock increment to return a recognizable value
    addDoc: jest.fn().mockResolvedValue({ id: 'newDoc123' }),
    getDoc: jest.fn().mockResolvedValue({
      exists: () => true,
      data: () => ({ name: 'Test Document' }), 
      id: 'doc123' }),
  }));

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({user: {uid: '123'}}),
    signInWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    getDocs: jest.fn().mockResolvedValue({
        empty: false,
        docs: { id: '123', 
            data: () => ({ 
                username: 'testname', 
                email: 'testname@gmail.com', 
                friends: ['friend1'], 
                profilepicture: 'pic', 
                tokens: 10 })
            },
    })
}));

import UserModel from './../(tabs)/Models/UserModel.tsx';

const fetchTokensReturnObj = {tokens: 10, userDocId: '123'};

test('signUp handles invalid argument of type int', async () => {
    const result = await UserModel.signUp(123, 123, 123);
    expect(result).toBe(null);
});

test('signUp handles invalid argument of type boolean', async () => {
    const result = await UserModel.signUp(true, true, true);
    expect(result).toBe(null);
});

test('signUp should not return anything on valid arguments of type string', async () => {
    const result = await UserModel.signUp('email', 'password', 'username');
    expect(result).toBe(undefined);
});

test('signIn handles invalid argument of type int', async () => {
    const result = await UserModel.signIn(123, 123);
    expect(result).toBe(null);
});

test('signIn handles invalid argument of type boolean', async () => {
    const result = await UserModel.signIn(true, true);
    expect(result).toBe(null);
});

test('signIn should not return anything on valid arguments of type string', async () => {
    const result = await UserModel.signIn('email', 'password');
    expect(result).toBe(undefined);
});

test('changePw handles invalid argument of type int', async () => {
    const result = await UserModel.changePw(123, 123);
    expect(result).toBe(null);
});

test('changePw handles invalid argument of type boolean', async () => {
    const result = await UserModel.changePw(true, true);
    expect(result).toBe(null);
});

test('changePw should not return anything on valid arguments of type string', async () => {
    const result = await UserModel.changePw('email');
    expect(result).toBe(undefined);
});

test('fetchTokens handles invalid argument of type int', async () => {
    const result = await UserModel.fetchTokens(123);
    expect(result).toBe(null);
});

test('fetchTokens handles invalid argument of type boolean', async () => {
    const result = await UserModel.fetchTokens(true);
    expect(result).toBe(null);
});

test('fetchTokens should return token data for valid argument of type string', async () => {
    const result = await UserModel.fetchTokens('123');
    expect(result).toEqual(fetchTokensReturnObj);
});

test('updateTokensAndAddFish handles invalid argument of type int', async () => {
    const result = await UserModel.updateTokensAndAddFish(123, 123, 123);
    expect(result).toBe(null);
});

test('updateTokensAndAddFish handles invalid argument of type boolean', async () => {
    const result = await UserModel.updateTokensAndAddFish(true, true, true);
    expect(result).toBe(null);
});

test('updateTokensAndAddFish should not return anything on valid arguments', async () => {
    const result = await UserModel.updateTokensAndAddFish('123', 10, {type: 'clownfish', tier: 'tier1'});
    expect(result).toBe(undefined);
});

test('updateTokens handles invalid argument of type int', async () => {
    const result = await UserModel.updateTokens(123, 123);
    expect(result).toBe(null);
});

test('updateTokens handles invalid argument of type boolean', async () => {
    const result = await UserModel.updateTokens(true, true);
    expect(result).toBe(null);
});

test('updateTokens should not return anything on valid arguments', async () => {
    const result = await UserModel.updateTokens('123', 10);
    expect(result).toBe(undefined);
});
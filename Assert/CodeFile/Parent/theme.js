// ─── App-wide Design Tokens ───────────────────────────────────────────────────
export const COLORS = {
    blue: '#2979FF',
    blueDark: '#1A5FCC',
    blueLight: '#EBF1FF',
    blueMid: '#D0E4FF',

    green: '#22C55E',
    greenLight: '#DCFCE7',
    orange: '#F59E0B',
    orangeLight: '#FEF3C7',
    red: '#EF4444',
    redLight: '#FEE2E2',

    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',

    white: '#FFFFFF',
    bg: '#F2F4F8',
    bgCard: '#FFFFFF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    divider: '#E9ECF0',
};

export const FONTS = {
    regular: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semiBold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
    extraBold: { fontWeight: '800' },
};

export const RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 50,
};

export const SHADOW = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
};

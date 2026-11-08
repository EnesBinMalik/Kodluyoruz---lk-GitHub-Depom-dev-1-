import styled, { css } from 'styled-components';

export interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'gradient';
  $size?: 'sm' | 'md' | 'lg' | 'xl';
  $fullWidth?: boolean;
  $active?: boolean;
}

const sizeStyles = {
  sm: css`
    padding: 0.45rem 0.85rem;
    font-size: 0.825rem;
    border-radius: 0.5rem;
    gap: 0.375rem;
  `,
  md: css`
    padding: 0.65rem 1.25rem;
    font-size: 0.925rem;
    border-radius: 0.75rem;
    gap: 0.5rem;
  `,
  lg: css`
    padding: 0.85rem 1.65rem;
    font-size: 1.05rem;
    border-radius: 0.875rem;
    gap: 0.625rem;
  `,
  xl: css`
    padding: 1.1rem 2.2rem;
    font-size: 1.15rem;
    border-radius: 1rem;
    gap: 0.75rem;
  `,
};

const variantStyles = {
  primary: css`
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 14px 0 rgba(5, 150, 105, 0.35);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 6px 20px 0 rgba(5, 150, 105, 0.45);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 8px 0 rgba(5, 150, 105, 0.3);
    }
  `,

  secondary: css`
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

    &:hover:not(:disabled) {
      background: #e2e8f0;
      color: #0f172a;
      border-color: #94a3b8;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  success: css`
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 14px 0 rgba(22, 163, 74, 0.3);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      box-shadow: 0 6px 18px 0 rgba(22, 163, 74, 0.4);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  danger: css`
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 14px 0 rgba(220, 38, 38, 0.25);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 6px 18px 0 rgba(220, 38, 38, 0.35);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  outline: css`
    background: transparent;
    color: #059669;
    border: 1.5px solid #059669;

    &:hover:not(:disabled) {
      background: rgba(5, 150, 105, 0.08);
      border-color: #047857;
      color: #047857;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  gradient: css`
    background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 16px 0 rgba(59, 130, 246, 0.35);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #38bdf8 0%, #2563eb 50%, #4f46e5 100%);
      box-shadow: 0 6px 22px 0 rgba(59, 130, 246, 0.45);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
};

export const BaseButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.25;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  outline: none;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  &:focus-visible {
    ring: 2px solid #059669;
    ring-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  ${(props) => sizeStyles[props.$size || 'md']}
  ${(props) => variantStyles[props.$variant || 'primary']}
`;

export const PrimaryButton = styled(BaseButton)`
  /* Default primary styling */
`;

export const SecondaryButton = styled(BaseButton).attrs({
  $variant: 'secondary',
})``;

export const SuccessButton = styled(BaseButton).attrs({
  $variant: 'success',
})``;

export const DangerButton = styled(BaseButton).attrs({
  $variant: 'danger',
})``;

export const OutlineButton = styled(BaseButton).attrs({
  $variant: 'outline',
})``;

export const GradientButton = styled(BaseButton).attrs({
  $variant: 'gradient',
})``;

export const CalculateButton = styled(BaseButton)`
  background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%);
  color: #ffffff;
  padding: 1rem 2rem;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px -4px rgba(5, 150, 105, 0.45);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 12px 28px -4px rgba(5, 150, 105, 0.55);

    &::before {
      left: 140%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-1px) scale(0.99);
  }
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  ${(props) =>
    props.$active
      ? css`
          background-color: #059669;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        `
      : css`
          background-color: transparent;
          color: #64748b;
          &:hover {
            background-color: #f1f5f9;
            color: #1e293b;
          }
        `}
`;

export const QuickSelectButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;

  ${(props) =>
    props.$active
      ? css`
          background: #ecfdf5;
          color: #047857;
          border: 2px solid #10b981;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
        `
      : css`
          background: #ffffff;
          color: #475569;
          border: 1.5px solid #e2e8f0;
          &:hover {
            border-color: #94a3b8;
            background: #f8fafc;
            color: #0f172a;
          }
        `}
`;

import styled, { css } from 'styled-components';

export interface BaseButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

// Primary High-End Fashion CTA Styled Button
export const StyledPrimaryButton = styled.button<BaseButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: 0.375rem;
  transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  /* Sizes */
  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return css`
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
        `;
      case 'lg':
        return css`
          padding: 1rem 2rem;
          font-size: 0.9375rem;
          letter-spacing: 0.05em;
        `;
      case 'md':
      default:
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
        `;
    }
  }}

  /* Colors */
  background-color: #1c1917;
  color: #fafaf9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled) {
    background-color: #292524;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background-color: #0c0a09;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid #1c1917;
    outline-offset: 2px;
  }
`;

// Secondary / Minimalist Styled Button
export const StyledSecondaryButton = styled.button<BaseButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  background-color: #ffffff;
  color: #292524;
  border: 1px solid #e7e5e4;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return css`
          padding: 0.5rem 0.875rem;
          font-size: 0.75rem;
        `;
      case 'lg':
        return css`
          padding: 0.875rem 1.75rem;
          font-size: 0.9375rem;
        `;
      case 'md':
      default:
        return css`
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
        `;
    }
  }}

  &:hover:not(:disabled) {
    background-color: #fafaf9;
    border-color: #d6d3d1;
    color: #0c0a09;
  }

  &:active:not(:disabled) {
    background-color: #f5f5f4;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #292524;
    outline-offset: 2px;
  }
`;

// "Sepete Ekle" (Add To Cart) Styled Button
export const StyledCartButton = styled.button<{ $added?: boolean; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.9375rem 1.75rem;
  border-radius: 0.375rem;
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid ${(props) => (props.$added ? '#15803d' : '#1c1917')};
  background-color: ${(props) => (props.$added ? '#15803d' : '#1c1917')};
  color: #ffffff;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$added ? '#166534' : '#292524')};
    transform: translateY(-1px);
    box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid #1c1917;
    outline-offset: 2px;
  }
`;

// "Favorilere Ekle" (Add To Favorites) Styled Button
export const StyledFavoriteButton = styled.button<{ $isFavorited?: boolean; $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  font-size: ${(props) => (props.$compact ? '0.75rem' : '0.875rem')};
  letter-spacing: 0.02em;
  padding: ${(props) => (props.$compact ? '0.5rem 0.75rem' : '0.875rem 1.25rem')};
  border-radius: 0.375rem;
  transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid ${(props) => (props.$isFavorited ? '#fecdd3' : '#e7e5e4')};
  background-color: ${(props) => (props.$isFavorited ? '#fff1f2' : '#ffffff')};
  color: ${(props) => (props.$isFavorited ? '#e11d48' : '#44403c')};

  svg {
    transition: transform 180ms ease;
    fill: ${(props) => (props.$isFavorited ? '#e11d48' : 'none')};
    stroke: ${(props) => (props.$isFavorited ? '#e11d48' : 'currentColor')};
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$isFavorited ? '#ffe4e6' : '#fafaf9')};
    border-color: ${(props) => (props.$isFavorited ? '#fda4af' : '#d6d3d1')};
    color: ${(props) => (props.$isFavorited ? '#be123c' : '#1c1917')};

    svg {
      transform: scale(1.1);
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid #e11d48;
    outline-offset: 2px;
  }
`;

// "Anasayfaya Dön" (Back To Home) Styled Button
export const StyledBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #57534e;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.5rem 0.875rem;
  border-radius: 0.375rem;
  transition: all 150ms ease;
  cursor: pointer;

  svg {
    transition: transform 150ms ease;
  }

  &:hover {
    color: #1c1917;
    background-color: #f5f5f4;

    svg {
      transform: translateX(-3px);
    }
  }

  &:active {
    background-color: #e7e5e4;
  }

  &:focus-visible {
    outline: 2px solid #1c1917;
    outline-offset: 2px;
  }
`;

// Filter Pill / Segment Tab Styled Button
export const StyledFilterButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  padding: 0.4375rem 0.875rem;
  border-radius: 0.375rem;
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  background-color: ${(props) => (props.$active ? '#1c1917' : '#ffffff')};
  color: ${(props) => (props.$active ? '#fafaf9' : '#57534e')};
  border: 1px solid ${(props) => (props.$active ? '#1c1917' : '#e7e5e4')};

  &:hover {
    background-color: ${(props) => (props.$active ? '#292524' : '#f5f5f4')};
    color: ${(props) => (props.$active ? '#ffffff' : '#1c1917')};
    border-color: ${(props) => (props.$active ? '#292524' : '#d6d3d1')};
  }

  &:focus-visible {
    outline: 2px solid #1c1917;
    outline-offset: 2px;
  }
`;

// Minimalist Icon Action Styled Button
export const StyledIconButton = styled.button<{ $size?: 'sm' | 'md' | 'lg'; $badge?: number }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: transparent;
  border: 1px solid transparent;
  color: #292524;
  transition: all 150ms ease;
  cursor: pointer;

  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return css`
          width: 2rem;
          height: 2rem;
        `;
      case 'lg':
        return css`
          width: 2.75rem;
          height: 2.75rem;
        `;
      case 'md':
      default:
        return css`
          width: 2.375rem;
          height: 2.375rem;
        `;
    }
  }}

  &:hover {
    background-color: #f5f5f4;
    color: #0c0a09;
  }

  &:active {
    background-color: #e7e5e4;
  }

  &:focus-visible {
    outline: 2px solid #1c1917;
    outline-offset: 2px;
  }
`;

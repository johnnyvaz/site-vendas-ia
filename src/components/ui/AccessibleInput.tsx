/**
 * AccessibleInput - WCAG 2.1 AA Compliant Input Component
 * Provides comprehensive accessibility features for Vendas.IA forms
 * Portuguese language support with Brazilian localization
 */

import React, { forwardRef, useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export interface AccessibleInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  description?: string;
  error?: string;
  success?: string;
  hint?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  maxLength?: number;
  showCharacterCount?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'search';
  validation?: 'none' | 'email' | 'phone' | 'cpf' | 'cnpj';
  maskFormat?: string;
  onValidationChange?: (isValid: boolean, errorMessage?: string) => void;
}

const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({
    className,
    type = 'text',
    label,
    description,
    error,
    success,
    hint,
    required = false,
    showPasswordToggle = false,
    size = 'md',
    variant = 'default',
    leftIcon,
    rightIcon,
    maxLength,
    showCharacterCount = false,
    autoComplete,
    inputMode,
    validation = 'none',
    maskFormat,
    onValidationChange,
    onChange,
    onBlur,
    value,
    disabled,
    placeholder,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');
    const [validationError, setValidationError] = useState<string>('');

    const inputId = useId();
    const descriptionId = useId();
    const errorId = useId();
    const hintId = useId();

    const inputType = showPasswordToggle && showPassword ? 'text' : type;
    const currentValue = value ?? internalValue;
    const currentLength = String(currentValue).length;
    const hasError = error || validationError;
    const hasSuccess = success && !hasError;

    // WCAG 2.1 AA - Size and spacing requirements
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base', // Minimum 44px touch target
      lg: 'h-13 px-6 text-lg'
    };

    // High contrast colors for accessibility
    const variantClasses = {
      default: 'border-input bg-background',
      filled: 'border-0 bg-muted',
      outlined: 'border-2 border-input bg-transparent'
    };

    const stateClasses = cn({
      'border-destructive ring-destructive': hasError,
      'border-green-500 ring-green-500': hasSuccess,
      'border-primary ring-primary': isFocused && !hasError && !hasSuccess,
      'opacity-50 cursor-not-allowed': disabled
    });

    // Brazilian validation patterns
    const validationPatterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^(\+55\s?)?(\(?[1-9]{2}\)?\s?)?(9\s?)?[0-9]{4}-?[0-9]{4}$/,
      cpf: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/,
      cnpj: /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$/
    };

    const validationMessages = {
      email: 'Por favor, insira um e-mail válido (ex: nome@empresa.com.br)',
      phone: 'Por favor, insira um telefone válido (ex: (16) 99999-9999)',
      cpf: 'Por favor, insira um CPF válido (ex: 123.456.789-00)',
      cnpj: 'Por favor, insira um CNPJ válido (ex: 12.345.678/0001-90)',
      required: 'Este campo é obrigatório',
      maxLength: `Máximo de ${maxLength} caracteres permitidos`
    };

    // Validation function
    const validateInput = (inputValue: string): { isValid: boolean; message?: string } => {
      if (required && !inputValue.trim()) {
        return { isValid: false, message: validationMessages.required };
      }

      if (maxLength && inputValue.length > maxLength) {
        return { isValid: false, message: validationMessages.maxLength };
      }

      if (validation !== 'none' && inputValue.trim()) {
        const pattern = validationPatterns[validation];
        if (!pattern.test(inputValue)) {
          return { isValid: false, message: validationMessages[validation] };
        }
      }

      return { isValid: true };
    };

    // Handle input change with validation
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      // Real-time validation
      const validation = validateInput(newValue);
      setValidationError(validation.isValid ? '' : validation.message || '');

      onValidationChange?.(validation.isValid, validation.message);
      onChange?.(e);
    };

    // Handle blur validation
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      const validation = validateInput(e.target.value);
      setValidationError(validation.isValid ? '' : validation.message || '');

      onValidationChange?.(validation.isValid, validation.message);
      onBlur?.(e);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    // ARIA attributes for accessibility
    const ariaDescribedBy = [
      description && descriptionId,
      hasError && errorId,
      hint && hintId
    ].filter(Boolean).join(' ');

    return (
      <div className="space-y-2">
        {/* Label */}
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium leading-none',
            'text-foreground',
            disabled && 'opacity-50',
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </label>

        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-required={required}
            className={cn(
              'flex w-full rounded-md border ring-offset-background',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200',
              // WCAG 2.1 AA - Minimum touch target size
              'min-h-[44px]',
              sizeClasses[size],
              variantClasses[variant],
              stateClasses,
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle || hasError || hasSuccess) && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Right Side Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Validation Icons */}
            {hasError && (
              <AlertCircle
                className="h-4 w-4 text-destructive"
                aria-hidden="true"
              />
            )}
            {hasSuccess && (
              <CheckCircle2
                className="h-4 w-4 text-green-500"
                aria-hidden="true"
              />
            )}

            {/* Password Toggle */}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  'p-1 rounded-sm',
                  'hover:bg-muted transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  'text-muted-foreground hover:text-foreground'
                )}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !hasError && !hasSuccess && (
              <div className="text-muted-foreground">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Character Count */}
        {showCharacterCount && maxLength && (
          <div
            className={cn(
              'text-xs text-right',
              currentLength > maxLength * 0.9 && 'text-orange-500',
              currentLength >= maxLength && 'text-destructive'
            )}
            aria-live="polite"
          >
            {currentLength}/{maxLength}
          </div>
        )}

        {/* Error Message */}
        {hasError && (
          <p
            id={errorId}
            className="text-sm text-destructive flex items-center gap-2"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error || validationError}
          </p>
        )}

        {/* Success Message */}
        {hasSuccess && (
          <p
            className="text-sm text-green-600 flex items-center gap-2"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            {success}
          </p>
        )}

        {/* Hint */}
        {hint && !hasError && !hasSuccess && (
          <p
            id={hintId}
            className="text-sm text-muted-foreground"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

export { AccessibleInput };
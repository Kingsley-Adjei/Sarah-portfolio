import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sent' | 'received';
  className?: string;
  children: React.ReactNode;
  key?: React.Key;
}

export function ChatBubble({ variant = 'received', className, children, ...props }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-end gap-2.5 my-1.5',
        variant === 'sent' ? 'flex-row-reverse justify-start' : 'flex-row justify-start',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback?: string;
  src?: string;
  className?: string;
}

export function ChatBubbleAvatar({ fallback = 'AI', src, className, ...props }: ChatBubbleAvatarProps) {
  return (
    <div
      className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold tracking-wider flex-shrink-0 border border-white/10',
        className
      )}
      {...props}
    >
      {src ? <img src={src} alt="Avatar" className="w-full h-full rounded-full object-cover" /> : fallback}
    </div>
  );
}

export interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sent' | 'received';
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChatBubbleMessage({
  variant = 'received',
  isLoading = false,
  className,
  children,
  ...props
}: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        'px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed font-light transition-all',
        variant === 'sent'
          ? 'bg-white text-black rounded-br-xs font-normal'
          : 'bg-[#181818] text-neutral-200 border border-white/10 rounded-bl-xs',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-1 py-1">
          <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export interface ChatBubbleActionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function ChatBubbleActionWrapper({ className, children, ...props }: ChatBubbleActionWrapperProps) {
  return (
    <div className={cn('flex items-center gap-1 mt-1 text-neutral-400 text-[10px]', className)} {...props}>
      {children}
    </div>
  );
}

export interface ChatBubbleActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ChatBubbleAction({ icon, className, onClick, ...props }: ChatBubbleActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('p-1 rounded hover:text-white transition-colors cursor-pointer', className)}
      {...props}
    >
      {icon}
    </button>
  );
}

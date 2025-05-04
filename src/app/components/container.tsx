export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-dvw h-dvh flex flex-col -z-20">
            {children}
        </div>
    );
}

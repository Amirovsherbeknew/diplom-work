export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-[30px] bg-white p-[30px]">
            {children}
        </div>
    );
}

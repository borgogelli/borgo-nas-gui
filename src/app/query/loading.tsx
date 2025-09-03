// app/users/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingTable() {
    return (
        <div className="p-6">
            <div className="mb-4">
                <Skeleton className="h-6 w-1/4" /> {/* Titolo tabella */}
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-muted">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Nome</th>
                            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Email</th>
                            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Ruolo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-4">
                                    <Skeleton className="h-4 w-32" />
                                </td>
                                <td className="p-4">
                                    <Skeleton className="h-4 w-48" />
                                </td>
                                <td className="p-4">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

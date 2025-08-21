
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare } from "lucide-react"

export default function TasklistPage() {
  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tasklist" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Tasklist
              </CardTitle>
              <CardDescription>
                Gestiona tus tareas y objetivos diarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta sección estará disponible próximamente. Aquí podrás gestionar tus tareas diarias y objetivos.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

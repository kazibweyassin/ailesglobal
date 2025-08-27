import NavigationClean from '@/components/NavigationClean'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavigationClean />
      {children}
    </>
  )
}

type RoleOutOfScopeBannerProps = {
  roleLabel: string;
};

export function RoleOutOfScopeBanner({ roleLabel }: RoleOutOfScopeBannerProps) {
  return (
    <div className="sticky top-3 z-30">
      <div className="rounded-md border border-destructive/40 bg-destructive/12 px-4 py-2 text-sm font-medium text-destructive shadow-surface">
        {roleLabel} features are currently out of scope for this project.
      </div>
    </div>
  );
}

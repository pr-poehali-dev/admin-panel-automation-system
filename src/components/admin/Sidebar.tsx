import { navItems, roleLabels } from '@/lib/navConfig';
import { useAuth } from '@/lib/auth';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  active: string;
  onSelect: (key: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ active, onSelect, collapsed, onToggle }: SidebarProps) => {
  const { user, logout } = useAuth();
  const items = navItems.filter((i) => user && i.roles.includes(user.role));

  const initials = user?.name.split(' ').map((w) => w[0]).slice(0, 2).join('') ?? '';

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0 z-30',
        collapsed ? 'w-[76px]' : 'w-64',
      )}
    >
      <div className={cn('flex items-center gap-3 h-16 px-4 border-b border-sidebar-border', collapsed && 'justify-center px-0')}>
        <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shrink-0 glow">
          <Icon name="Wrench" className="text-primary-foreground" size={20} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-display font-bold leading-none tracking-wide">TechFix</p>
            <p className="text-[11px] text-muted-foreground">АИС сервиса</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 space-y-1">
        {items.map((item) => {
          const isActive = active === item.key;
          const btn = (
            <button
              onClick={() => onSelect(item.key)}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition group relative',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'gradient-brand text-primary-foreground glow'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <Icon name={item.icon} size={20} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );

          return collapsed ? (
            <Tooltip key={item.key} delayDuration={0}>
              <TooltipTrigger asChild>{btn}</TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                <p>{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div key={item.key}>{btn}</div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-2">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <Avatar className="w-9 h-9 border border-sidebar-border">
            <AvatarFallback className="gradient-brand text-primary-foreground text-xs font-semibold">{initials}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground">{user && roleLabels[user.role]}</p>
            </div>
          )}
        </div>
        <div className={cn('flex gap-2', collapsed && 'flex-col')}>
          <Button variant="secondary" size="sm" onClick={onToggle} className="flex-1">
            <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </Button>
          {!collapsed && (
            <Button variant="ghost" size="sm" onClick={logout} className="text-destructive hover:text-destructive">
              <Icon name="LogOut" size={16} />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

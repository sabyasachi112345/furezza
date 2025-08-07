import {
  Wrench, CheckCircle, Loader, CalendarClock, Briefcase,
  LucideIcon, UserCheck, UserX, X, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Job, StatCardKey, Technician, DateRangeConfig, DateRangeView } from "../../../types";
import { useEffect, useRef, useState } from "react";
import SideBarMenu from "../SideBarMenu";

const statCards: { key: StatCardKey; label: string; bgColor: string; borderColor: string; icon: LucideIcon }[] = [
  { key: 'total', label: 'Total Jobs', bgColor: 'bg-blue-100', borderColor: 'border-blue-500', icon: Briefcase },
  { key: 'IN_PROGRESS', label: 'In Progress', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500', icon: Loader },
  { key: 'COMPLETED', label: 'Completed', bgColor: 'bg-green-100', borderColor: 'border-green-500', icon: CheckCircle },
  { key: 'SCHEDULED', label: 'Scheduled', bgColor: 'bg-orange-100', borderColor: 'border-orange-500', icon: CalendarClock }
];

interface HeaderProps {
  stats: {
    total: number;
    IN_PROGRESS: number;
    COMPLETED: number;
    SCHEDULED: number;
    activeFilter: string;
  };
  jobs: Job[];
  technicians: Technician[];
  onFilter: (status: StatCardKey | 'ACTIVE' | 'INACTIVE') => void;
  activeFilter: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  dateRangeConfig: DateRangeConfig;
  onDateRangeChange: (config: DateRangeConfig) => void;
}

const Header: React.FC<HeaderProps> = ({
  stats, jobs, technicians, onFilter,
  activeFilter, searchTerm, onSearchChange,
  dateRangeConfig, onDateRangeChange
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === 'Escape') {
        onSearchChange('');
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  const activeCount = technicians.filter(t => t.status === 'ACTIVE').length;
  const inactiveCount = technicians.filter(t => t.status === 'INACTIVE').length;
  const [searchFocused, setSearchFocused] = useState(false);

  const viewOptions: { label: string; value: DateRangeView }[] = [
    { label: 'Day', value: 'DAY' },
    { label: 'Week', value: 'WEEK' },
    { label: 'Month', value: 'MONTH' },
    { label: 'Custom', value: 'CUSTOM' },
  ];

  const applyTimeWindow = (date: Date, hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    return newDate.toISOString();
  };

  const handleSelectedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const view = dateRangeConfig.view;
    const { startHour, endHour } = dateRangeConfig.timeWindow;

    let newStart = new Date(selectedDate);
    let newEnd = new Date(selectedDate);

    switch (view) {
      case 'DAY':
        newStart = new Date(selectedDate);
        newEnd = new Date(selectedDate);
        break;
      case 'WEEK':
        newStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + 6);
        break;
      case 'MONTH':
        newStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        newEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        break;
      case 'CUSTOM':
        return onDateRangeChange({
          ...dateRangeConfig,
          selectedDate: selectedDate.toISOString(),
        });
    }

    onDateRangeChange({
      ...dateRangeConfig,
      selectedDate: selectedDate.toISOString(),
      startDate: applyTimeWindow(newStart, startHour),
      endDate: applyTimeWindow(newEnd, endHour),
    });
  };

  const handleViewChange = (view: DateRangeView) => {
    const selectedDate = new Date(dateRangeConfig.selectedDate);
    let newStart = new Date(selectedDate);
    let newEnd = new Date(selectedDate);
    const { startHour, endHour } = dateRangeConfig.timeWindow;

    switch (view) {
      case 'DAY':
        newStart = new Date(selectedDate);
        newEnd = new Date(selectedDate);
        break;
      case 'WEEK':
        newStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + 6);
        break;
      case 'MONTH':
        newStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        newEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        break;
      case 'CUSTOM':
        newStart = new Date(dateRangeConfig.startDate);
        newEnd = new Date(dateRangeConfig.endDate);
        break;
    }

    onDateRangeChange({
      ...dateRangeConfig,
      view,
      startDate: applyTimeWindow(newStart, startHour),
      endDate: applyTimeWindow(newEnd, endHour),
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between flex-nowrap gap-6 overflow-x-auto w-full">
        {/* Logo */}
        <div className="flex items-start gap-6 shrink-0">
          <div className="flex items-center gap-2 mt-1">
            <SideBarMenu />
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Fuerza</h1>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="flex gap-2 flex-wrap shrink">
          {[...statCards, {
            key: 'ACTIVE', label: 'Active Techs', bgColor: 'bg-green-100', borderColor: 'border-green-500', icon: UserCheck
          }, {
            key: 'INACTIVE', label: 'Inactive Techs', bgColor: 'bg-red-100', borderColor: 'border-red-500', icon: UserX
          }].map(({ key, label, bgColor, borderColor, icon: Icon }) => {
            const value =
              key === 'SCHEDULED' ? stats.SCHEDULED :
              key === 'IN_PROGRESS' ? stats.IN_PROGRESS :
              key === 'COMPLETED' ? stats.COMPLETED :
              key === 'total' ? stats.total :
              key === 'ACTIVE' ? activeCount :
              key === 'INACTIVE' ? inactiveCount : 0;

            const isActive = activeFilter === key;

            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => onFilter(activeFilter === key ? 'total' : (key as any))}
                className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 min-w-[130px] text-sm hover:shadow-sm transition ${isActive ? `${bgColor} ${borderColor}` : 'bg-gray-50 border-gray-200'}`}
              >
                <Icon className={`h-4 w-4 ${isActive ? borderColor.replace('border', 'text') : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium text-gray-700 truncate">{label}</div>
                  <div className="font-semibold text-gray-900">{value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0 min-w-fit">
          {/* Search */}
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search ( / )"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`pl-8 pr-8 py-2 border border-gray-300 rounded-md text-sm transition-all duration-300 ${
                searchTerm || searchFocused ? 'w-64' : 'w-48'
              }`}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Select */}
          <select
            value={dateRangeConfig.view}
            onChange={(e) => handleViewChange(e.target.value as DateRangeView)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {viewOptions.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Date Picker */}
          {dateRangeConfig.view !== 'CUSTOM' ? (
            <input
              type="date"
              value={dateRangeConfig.selectedDate.slice(0, 10)}
              onChange={handleSelectedDateChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          ) : (
            <>
              <input
                type="date"
                value={dateRangeConfig.startDate.slice(0, 10)}
                onChange={(e) => onDateRangeChange({ ...dateRangeConfig, startDate: new Date(e.target.value).toISOString() })}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <span className="mx-1">–</span>
              <input
                type="date"
                value={dateRangeConfig.endDate.slice(0, 10)}
                onChange={(e) => onDateRangeChange({ ...dateRangeConfig, endDate: new Date(e.target.value).toISOString() })}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </>
          )}

          {/* Time Start/End */}
          <input
            type="number"
            min={0}
            max={23}
            value={dateRangeConfig.timeWindow.startHour}
            onChange={(e) => onDateRangeChange({
              ...dateRangeConfig,
              timeWindow: { ...dateRangeConfig.timeWindow, startHour: parseInt(e.target.value) }
            })}
            title="Start Hour"
            className="border border-gray-300 rounded px-2 py-1 text-sm w-14"
          />
          <span className="mx-1">–</span>
          <input
            type="number"
            min={1}
            max={24}
            value={dateRangeConfig.timeWindow.endHour}
            onChange={(e) => onDateRangeChange({
              ...dateRangeConfig,
              timeWindow: { ...dateRangeConfig.timeWindow, endHour: parseInt(e.target.value) }
            })}
            title="End Hour"
            className="border border-gray-300 rounded px-2 py-1 text-sm w-14"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

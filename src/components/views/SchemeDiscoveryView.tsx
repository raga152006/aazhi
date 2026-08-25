import React, { useState, useEffect } from 'react';
import { Search, Filter, Compass, Bookmark, GraduationCap, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { API } from '../../services/api';
import { Scheme } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const SchemeDiscoveryView: React.FC = () => {
  const { openSchemeDetails, startApplicationForScheme, userProfile } = useAuth();

  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const [maxIncomeFilter, setMaxIncomeFilter] = useState<string>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const categories = [
    'All',
    'Education',
    'Employment',
    'Agriculture',
    'Women',
    'Senior Citizens',
    'Health',
    'Housing',
    'Financial Assistance',
    'Disability',
    'Entrepreneurship',
    'Welfare',
  ];

  useEffect(() => {
    loadSchemes();
  }, [searchQuery, selectedCategory, maxIncomeFilter]);

  const loadSchemes = async () => {
    setLoading(true);
    let incomeVal: number | undefined = undefined;
    if (maxIncomeFilter === '1L') incomeVal = 100000;
    if (maxIncomeFilter === '2.5L') incomeVal = 250000;

    const data = await API.getSchemes({
      search: searchQuery,
      category: selectedCategory,
      maxIncome: incomeVal,
    });
    setSchemes(data);
    setLoading(false);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Government Scheme Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <Compass className="w-7 h-7 text-saffron-500" /> Discover Central & State Schemes
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Search and filter official benefit schemes tailored to your eligibility.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs text-slate-200">
          State Focus: <strong className="text-emerald-400 font-bold">{selectedState}</strong>
        </div>
      </div>

      {/* TOP SEARCH & FILTERS BAR */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-card border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, department, or keyword..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Income Cap Filter */}
          <select
            value={maxIncomeFilter}
            onChange={(e) => setMaxIncomeFilter(e.target.value)}
            className="w-full md:w-48 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-600"
          >
            <option value="all">All Income Levels</option>
            <option value="1L">Income &lt; ₹1 Lakh/yr</option>
            <option value="2.5L">Income &lt; ₹2.5 Lakhs/yr</option>
          </select>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SCHEME CARDS GRID */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 font-semibold text-xs">
          Loading government schemes...
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <p className="font-bold text-slate-800 text-base">No matching schemes found</p>
          <p className="text-xs text-slate-500">Try clearing search filters or choosing a different category.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMaxIncomeFilter('all'); }}
            className="bg-brand-900 text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => {
            const isBookmarked = bookmarkedIds.includes(scheme.id);
            return (
              <div
                key={scheme.id}
                onClick={() => openSchemeDetails(scheme.id)}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition cursor-pointer flex flex-col justify-between space-y-4 group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-brand-50 text-brand-800 text-[11px] font-bold px-3 py-1 rounded-full border border-brand-100">
                      {scheme.category}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(scheme.id, e)}
                      className={`p-1.5 rounded-xl transition ${
                        isBookmarked ? 'bg-saffron-100 text-saffron-600' : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                      title="Save Scheme"
                    >
                      <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-brand-700 transition line-clamp-2">
                      {scheme.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{scheme.department}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {scheme.shortDescription}
                  </p>

                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-xs">
                    <span className="font-bold text-emerald-950 block mb-0.5">Benefit:</span>
                    <span className="text-emerald-800 font-semibold">{scheme.benefits.summary}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{scheme.matchScore || 90}% Match</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); startApplicationForScheme(scheme.id); }}
                      className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition"
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

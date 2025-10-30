import React from 'react';
import { buildCoverUrl, buildReadInfoFromDoc } from '../services/api';

const BookCard = ({ book }) => {
  const coverUrl = buildCoverUrl(book.cover_i, 'M');

  const author = book.author_name?.[0] || 'Unknown Author';
  const year = book.first_publish_year || 'N/A';

  const { readUrl, canRead, workUrl } = buildReadInfoFromDoc(book);

  return (
    <div className="group rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/30 to-cyan-500/30 hover:from-indigo-500/50 hover:via-fuchsia-500/50 hover:to-cyan-500/50 transition">
      <div className="h-full bg-slate-900/70 backdrop-blur-xl rounded-2xl p-4 shadow-xl shadow-black/40 border border-slate-800/60 group-hover:border-slate-700/80 transition flex flex-col items-center">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-44 h-60 md:w-48 md:h-64 object-cover rounded-lg mb-4 ring-1 ring-slate-700/60 group-hover:ring-slate-500/60 transition"
        />

        <div className="flex-1 flex flex-col items-center w-full">
          <h3 className="text-base font-semibold text-center line-clamp-2 text-slate-100">
            {book.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs bg-slate-800/80 text-slate-300 border border-slate-700/70">{author}</span>
            <span className="px-2.5 py-1 rounded-full text-xs bg-slate-800/80 text-slate-300 border border-slate-700/70">Year: {year}</span>
          </div>
        </div>

        <div className="w-full mt-4 flex items-center gap-2">
          <a
            href={canRead ? readUrl : undefined}
            target="_blank"
            rel="noreferrer"
            title={canRead ? 'Open reader' : 'Reading not available'}
            className={`flex-1 text-center rounded-full px-3 py-2 text-sm font-semibold transition shadow-md shadow-black/30 ${
              canRead
                ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 active:scale-[0.98]'
                : 'cursor-not-allowed opacity-40 text-slate-300 bg-slate-700/60'
            }`}
          >
            Read
          </a>
          {workUrl && (
            <a
              href={workUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center rounded-full px-3 py-2 text-sm font-semibold border border-slate-600 text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 active:scale-[0.98] transition shadow-md shadow-black/30"
            >
              Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

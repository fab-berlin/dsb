import { NextRequest } from 'next/server';

export type ReplacementItem = {
  date: ReplacementItemDate;
  classData: ReplacementClassData[];
};
export type ReplacementItemDate = {
  date: string;
  day: 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag';
  sorting: string;
};
export type ReplacementClassData = {
  cancellation: string;
  hour: string;
  message: string;
  name: string;
  newLesson: string;
  newRoom: string;
  oldLesson: string;
  oldRoom: string;
};

export type TimetableHour = {
  name: string;
  type: string;
  length: string;
  startType: 'A' | 'E';
  startTime: string;
  endTime: string;
};
export type TimetableDayItem = {
  day: string;
  hours: TimetableHour[];
};
export type Timetable = {
  timetable: TimetableDayItem[];
};

export interface LoginRequestBody {
  user: string;
  password: string;
}

export type DocumentDataProps = {
  id: string;
  date: string;
  title: string;
  children: DocumentDetailProps[];
};
export type DocumentDetailProps = {
  id: string;
  date: string;
  title: string;
  detail: string;
};

/**
 * Content type enum for DSB (Digitales Schwarzes Brett) entries.
 * - `Category` (2): A grouping/folder node that contains child entries.
 * - `Content` (4): A leaf node representing actual content (e.g. an image URL).
 */
export enum DsbConType {
  Category = 2,
  Content = 4,
}

/**
 * A single entry in the DSB control data feed.
 * The structure is recursive — each entry can contain child entries of the same shape.
 */
export interface DsbEntry {
  /** Unique identifier (UUID + timestamp, optionally suffixed with an index) */
  Id: string;
  /** Date string in "DD.MM.YYYY HH:MM" format */
  Date: string;
  /** Display title of the entry */
  Title: string;
  /** Detail text — typically empty for categories, or a full URL for content items */
  Detail: string;
  /** Comma-separated tags (may be empty) */
  Tags: string;
  /** Content type discriminator */
  ConType: DsbConType;
  /** Priority level (0 = default) */
  Prio: number;
  /** Sort/ordering index */
  Index: number;
  /** Nested child entries (same shape, recursive) */
  Childs: DsbEntry[];
  /** Relative preview image path (empty string if none) */
  Preview: string;
}

/** The top-level API response is an array of DSB entries. */
export type DsbResponse = DsbEntry[];

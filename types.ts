import React from 'react';

export type SectionName = 'home' | 'north' | 'central' | 'south' | 'timeline' | 'guide' | 'map';

export interface NavLinkData {
    id: SectionName;
    href: string;
    icon: React.ReactNode;
    tooltip: string;
    color: string;
}

export interface GalleryItem {
    src: string;
    alt: string;
    title: string;
}

export interface TimelineItemData {
    id: string;
    date: string;
    title: string;
    details: React.ReactNode;
    image: string;
    icon: React.ReactNode;
}

export interface SectionData {
    id: SectionName;
    title: string;
    subtitle?: string;
    content?: React.ReactNode;
    readMore?: React.ReactNode;
    readMoreId?: string;
    videoBackground?: string;
    gallery?: GalleryItem[];
    timeline?: TimelineItemData[];
    coordinates?: [number, number];
    // FIX: Changed type to React.ComponentType<any> to correctly type a React component.
    component: React.ComponentType<any>;
}
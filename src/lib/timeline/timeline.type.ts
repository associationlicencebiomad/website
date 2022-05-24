export enum ItemType {
	education = 'education',
	internship = 'internship',
	work = 'work',
};

export enum Position {
	left = 'left',
	right = 'right',
};

export type TimelineItemType = {
	type: ItemType,
	name: string,
	date: string,
	place: string,
	description: string,
};

export type TimelineType = Array<TimelineItemType>;

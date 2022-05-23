export enum Type {
	education = 'education',
	internship = 'internship',
	work = 'work',
};

export enum Position {
	left = 'left',
	right = 'right',
};

type timelineItem = {
	type: Type,
	name: string,
	date: string,
	place: string,
	description: string,
};

type timeline = Array<timelineItem>;

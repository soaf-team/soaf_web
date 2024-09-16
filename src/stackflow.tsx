import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { BottomTab } from './components/layout';
import { Toaster } from './components/Toaster';

const getLayoutModule = (path: string, layoutModules: any) => {
	const fileUrl = `${path.match(/(.*\/)page\.tsx/)?.[1]}Layout.tsx`;
	const parentDirUrl = `${path.match(/(.*\/)[^\/]*\/page\.tsx/)?.[1]}Layout.tsx`;

	return (
		layoutModules[fileUrl]?.default || layoutModules[parentDirUrl]?.default
	);
};

const modules: any = import.meta.glob('/src/pages/**/page.tsx', {
	eager: true,
});

const layoutModules: any = import.meta.glob('/src/pages/**/Layout.tsx', {
	eager: true,
});

const routes: {
	path: string;
	Element: React.ComponentType;
	Layout: React.ComponentType;
}[] = [];
for (const path of Object.keys(modules)) {
	const fileName = path.match(/pages\/(?!.*?\(.*?\)\/)(.*)\/page\.tsx/)?.[1];

	if (!fileName) {
		continue;
	}

	const normalizedPathName = fileName.replace(/\[(.*?)\]/, ':$1');
	routes.push({
		path: `/${normalizedPathName}`,
		Element: modules[path].default,
		Layout: getLayoutModule(path, layoutModules),
	});
}

export const { Stack, useFlow, useStepFlow } = stackflow({
	transitionDuration: 300,
	plugins: [
		basicRendererPlugin(),
		basicUIPlugin({
			theme: 'android',
			rootClassName: 'screen',
		}),
		historySyncPlugin({
			routes: routes.reduce(
				(acc, cur) => {
					acc[cur.Element.displayName as string] = cur.path;
					return acc;
				},
				{} as Record<string, string>,
			),
			fallbackActivity: () => 'DiaryCalendarPage',
		}),
		() => {
			return {
				key: 'my-plugin',
				render({ stack }) {
					return (
						<div className="layout">
							<BottomTab stack={stack} />
							<Toaster stack={stack} />
						</div>
					);
				},
			};
		},
	],
	// @ts-expect-error
	activities: routes
		.map((route) => route.Element)
		.reduce(
			(acc, cur) => {
				if (!cur.displayName) throw new Error('displayName is required');
				acc[cur.displayName as string] = cur;
				return acc;
			},
			{} as Record<string, React.ComponentType>,
		),
});

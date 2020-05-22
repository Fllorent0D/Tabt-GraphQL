import {NextFunction, Request, Response} from 'express';
import {getRepository, LessThan, LessThanOrEqual, MoreThan} from 'typeorm';
import {SeasonInfo} from '../entities/SeasonInfo';

const dateFormat = require('dateformat');

export const SEASON_HEADER_NAME = 'x-tabt-season';

export const seasonRequest = async (req: Request, res: Response, next: NextFunction) => {
	const seasonInHeader = req.headers[SEASON_HEADER_NAME];
	try {
		if (seasonInHeader !== undefined && typeof seasonInHeader !== 'string') {
			throw new Error('Season header not a string');
		}

		req['season'] = await getCurrentSeason(seasonInHeader as string);

		return next();
	} catch (err) {
		res.status(400).json({'message': err.message}).end();
	}
};

const getCurrentSeason = async (seasonName: string | null): Promise<SeasonInfo> => {
	const seasonRepo = getRepository(SeasonInfo);
	let season: SeasonInfo;
	if (seasonName) {
		// If user sets the season in headers
		season = await seasonRepo.findOne({
			where: {
				'name': seasonName
			}
		});
		if (!season) {
			throw new Error('Season requested not valid');
		}
	} else {
		// Otherwise check the current valid season
		const now = dateFormat(new Date(), 'yyyy-mm-dd');
		season = await seasonRepo.findOne({
			where: {'start_date': LessThan(now), 'stop_date': MoreThan(now)}
		});
		if (!season) {
			throw new Error('No current season found. Please contact an administrator');
		}
	}

	return season;
};


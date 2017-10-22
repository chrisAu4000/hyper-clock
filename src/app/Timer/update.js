const Maybe = require('crocks/Maybe')
const Either = require('crocks/Either')
const { Just, Nothing } = Maybe
const { Right, Left } = Either

const chain = require('crocks/pointfree/chain')
const compose = require('crocks/helpers/compose')
const composeB = require('crocks/combinators/composeB')
const curry = require('crocks/helpers/curry')
const either = require('crocks/pointfree/either')
const isBoolean = require('crocks/predicates/isBoolean')
const isInteger = require('crocks/predicates/isInteger')
const map = require('crocks/pointfree/map')
const objOf = require('crocks/helpers/objOf')
const reverseApply = require('crocks/combinators/reverseApply')
const safe = require('crocks/Maybe/safe')

const safeBool = safe(isBoolean)
const safeInt = safe(isInteger)
const isTrue = x => x === true ? Just(x) : Nothing()
const isFalse = x => x === false ? Just(x) : Nothing()
const isPositive = x => x >= 0 ? Just(x) : Nothing()
const safePosInt = composeB(chain(isPositive), safeInt)
const safeTrue = composeB(chain(isTrue), safeBool)
const safeFalse = composeB(chain(isFalse), safeBool)
const add = curry((a, b) => a + b)
const mul = curry((a, b) => a * b)
const gt = curry((n, x) => x > n ? Left('gt') : Right(x))
const lt = curry((n, x) => x < n ? Left('lt') : Right(x))
const inRange = curry((min, max, x) => gt(max, x).chain(lt(min)))
const safeNegateInt = composeB(map(mul(-1)), safeInt)

// shouldUpdate :: Boolean -> Maybe Boolean
const shouldUpdate = safeTrue
// direction :: Boolean -> Either (a -> Maybe a) (a -> Maybe a)
const direction = x => either(
	() => Left(safeNegateInt),
	() => Right(safeInt),
	safeFalse(x)
)
// updateMilliseconds :: a -> Maybe Either String Int
const updateMilliseconds = ({
	started,
	reversed,
	duration,
	milliseconds
}, delta) => {
	return shouldUpdate(started)
		.chain(() => direction(reversed)
			.either(reverseApply(delta), reverseApply(delta))
		)
		.chain(d => safePosInt(milliseconds).map(add(d)))
		.map(inRange(0, duration))
}

const update = {
	start: (_, actions, { duration }) => ({
		started: true,
		reversed: false,
		duration: safePosInt(duration).option(Infinity)
	}),
	reverse: () => ({
		started: true,
		reversed: true
	}),
	stop: () => ({
		started: false,
		milliseconds: 0
	}),
	pause: () => ({
		started: false
	}),
	resume: () => ({
		started: true,
	}),
	updateTime: (state, _, data) => update =>
		updateMilliseconds(state, safePosInt(data.interval).option(0))
			.map(m => 
				m.either(
					outOfBounds => outOfBounds === 'gt'
						? update({ started: false, milliseconds: state.duration })
						:	update({ started: false, milliseconds: 0 }),
					compose(update, objOf('milliseconds'))
				)
			)
}

module.exports = update

if (typeof (jsonmerge) === "undefined")
{
    var jsonmerge = function()
    {

        function _MergeRecords( one, two )
        {
            var record = {};
            for ( var i = 0; i < Object.keys( one ).length; i++ )
            {
                if ( typeof ( record[Object.keys( one )[i]] ) === "undefined" )
                {
                    record[Object.keys( one )[i]] = one[Object.keys( one )[i]];
                }
            }
            for ( var j = 0; j < Object.keys( two ).length; j++ )
            {
                if ( typeof ( record[Object.keys( two )[j]] ) === "undefined" )
                {
                    record[Object.keys( two )[j]] = two[Object.keys( two )[j]];
                }
            }
            return record;
        }

        function _InnerMatch(left, right, joiner)
        {
            return (joiner(left, right)) ? _MergeRecords(left, right) : null;
        }


        function InnerJoin( left, right, joiner )
        {
            var output = [];
            var temp = {};
            for (var i = 0; i < left.length; i++)
            {
                for (var j = 0; j < right.length; j++)
                {
                    temp = _InnerMatch(left[i], right[j], joiner);
                    if (temp !== null)
                    {
                        output.push(temp);
                    }
                }
            }
            return output;
        }
        function LeftOuterJoin( left, right, joiner )
        {
            var output = [];
            var found = false;
            for ( var i = 0; i < left.length; i++ )
            {
                found = false;
                for (var j = 0; j < right.length; j++)
                {
                    if (joiner(left[i], right[j]))
                    {
                        found = true;
                        output.push(_MergeRecords(left[i], right[j]));
                    }
                }
                if (!found)
                {
                    output.push(left[i]);
                }
            }
            return output;
        }

        function RightOuterJoin(left, right, joiner)
        {
            return LeftOuterJoin(right, left, joiner);
        }


        return {
            InnerJoin: InnerJoin,
            LeftOuterJoin: LeftOuterJoin,
            RightOuterJoin: RightOuterJoin
        };
    }();
}
